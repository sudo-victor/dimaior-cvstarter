"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useWizardActions, useWizardState } from "@/contexts/wizard-context";
import { useRouter } from "next/navigation";

const softSkilsOptions = [
  "Comunicação",
  "Trabalho em equipe",
  "Criatividade",
  "Organização",
  "Gestão do tempo",
  "Resolução de problemas",
  "Proatividade",
  "Comunicação eficaz",
  "Pensamento crítico",
  "Liderança",
];

const softSkillsSchema = z.object({
  softSkills: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma competência pessoal")
    .max(6, "Máximo de 6 competências"),
});

type SoftSkillFormValues = z.infer<typeof softSkillsSchema>;

const SoftSkillForm = () => {
  const wizardActions = useWizardActions();
  const router = useRouter();
  const { formData } = useWizardState();

  const savedData = formData.softSkills as SoftSkillFormValues | undefined;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SoftSkillFormValues>({
    resolver: zodResolver(softSkillsSchema),
    mode: "onChange",
    defaultValues: savedData || {
      softSkills: [],
    },
  });

  const selectedSkills = watch("softSkills");

  useEffect(() => {
    if (isValid && selectedSkills) {
      wizardActions.updateFormData("softSkills", {
        softSkills: selectedSkills,
      });
    }
  }, [selectedSkills, isValid]);

  const handleSkillToggle = (skill: string) => {
    const current = selectedSkills || [];
    if (current.includes(skill)) {
      setValue(
        "softSkills",
        current.filter((s) => s !== skill),
        { shouldValidate: true }
      );
    } else {
      setValue("softSkills", [...current, skill], { shouldValidate: true });
    }
  };

  const onSubmit = (data: SoftSkillFormValues) => {
    wizardActions.updateFormData("softSkills", data);
    router.push("/result");
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">
          Por fim, suas competências pessoais
        </h2>
        <p className="text-sm font-light">
          Selecione as habilidades que mais combinam com você. Elas mostram seu
          jeito de trabalhar e se relacionar, e podem ser um grande diferencial
          no currículo.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-7"
      >
        <div className="flex gap-2 flex-wrap">
          {softSkilsOptions.map((skill) => (
            <button
              type="button"
              key={skill}
              className={`px-4 py-2 rounded-full border hover:brightness-90 transition cursor-pointer ${
                selectedSkills.includes(skill)
                  ? "text-neutral-950 border-neutral-950 bg-primary"
                  : "bg-white text-black border-[#DDD]"
              }`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </button>
          ))}
        </div>

        {errors.softSkills && (
          <span className="text-red-500 text-xs">
            {errors.softSkills.message}
          </span>
        )}

        <div className="flex gap-4 flex-wrap max-sm:flex-col-reverse">
          <button
            type="button"
            onClick={onBack}
            className="w-fit max-sm:w-full py-3 px-6 flex items-center justify-center border border-[#1C1B1F] text-sm bg-transparent rounded-[6px] cursor-pointer hover:brightness-90 transition"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="w-fit max-sm:w-full py-3 px-6 flex items-center justify-center border border-[#1C1B1F] text-sm bg-primary rounded-[6px] cursor-pointer hover:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  );
};

export { SoftSkillForm };

"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";

const currentStateSchema = z.object({
  currentRole: z.string().min(2, "Informe sua formação ou ocupação atual"),
  experiences: z
    .string()
    .min(5, "Descreva pelo menos uma experiência ou aprendizado"),
  goals: z.string().min(2, "Informe o que você busca"),
});

type CurrentStateForm = z.infer<typeof currentStateSchema>;

const CurrentStateForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.currentState as CurrentStateForm | undefined;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CurrentStateForm>({
    resolver: zodResolver(currentStateSchema),
    mode: "onChange",
    defaultValues: savedData || {
      currentRole: "",
      experiences: "",
      goals: "",
    },
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("currentState", watchedData);
    }
  }, [isValid]);

  const onSubmit = (data: CurrentStateForm) => {
    wizardActions.updateFormData("currentState", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">O que você já fez até agora?</h2>
        <p className="text-sm font-light">
          Aqui você pode contar sobre seus estudos, experiências, cursos ou
          atividades que já participou. Mesmo pequenas conquistas contam!
        </p>
        <span className="text-xs font-light text-[#9C9C9C]">
          Fica tranquilo e escreve do seu jeito! A gente dá uma arrumada no
          final! 😉
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <Input
          label="Qual é sua formação ou cargo atual?"
          placeholder="Ensino Médio em andamento, faculdade, curso técnico, estágio"
          {...register("currentRole")}
          error={errors.currentRole?.message}
        />
        <Input
          label="O que você já fez e aprendeu?"
          placeholder="Trabalho voluntário, apresentação na escola, curso online, grupo de estudos"
          {...register("experiences")}
          error={errors.experiences?.message}
        />
        <Input
          label="O que você busca?"
          placeholder="Estágio, primeiro emprego, trainee, área de interesse"
          {...register("goals")}
          error={errors.goals?.message}
        />

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

export { CurrentStateForm };

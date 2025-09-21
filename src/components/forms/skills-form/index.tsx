"use client";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";
import { LuTrash2 } from "react-icons/lu";
import { Select } from "@/components/fields/select";

const skillsSchema = z.object({
  skills: z
    .array(
      z.object({
        title: z.string().min(2, "Nome da habilidade é obrigatório"),
        level: z.string().min(2, "Nível é obrigatório"),
      })
    )
    .min(1, "Adicione pelo menos uma habilidade")
    .max(10, "Máximo de 10 habilidades"),
});

type SkillsFormValues = z.infer<typeof skillsSchema>;

const SkillsForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.skills as SkillsFormValues | undefined;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsSchema),
    mode: "onChange",
    defaultValues: savedData || {
      skills: [{ title: "", level: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("skills", watchedData);
    }
  }, [isValid]);

  const handleAddSkill = () => {
    append({ title: "", level: "" });
  };

  const onSubmit = (data: SkillsFormValues) => {
    wizardActions.updateFormData("skills", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Conhecimentos e Habilidades</h2>
        <p className="text-sm font-light">
          Adicione conhecimentos técnicos e habilidades que fazem parte do seu
          perfil. Vale tanto ferramentas digitais quanto competências pessoais.
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
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="flex flex-col gap-6 rounded-[12px] p-4 border border-[#D9D9D9]"
          >
            <div className="flex gap-4 flex-wrap max-sm:flex-col">
              <div className="flex-1">
                <Input
                  label="Habilidade"
                  placeholder="Photoshop"
                  {...register(`skills.${idx}.title`)}
                />
                {errors.skills?.[idx]?.title && (
                  <span className="text-red-500 text-xs">
                    {errors.skills[idx]?.title?.message}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <Controller
                  name={`skills.${idx}.level`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Nível"
                      placeholder="Selecione"
                      value={field.value}
                      onValueChange={field.onChange}
                      options={[
                        { value: "basico", label: "Básico" },
                        { value: "intermediario", label: "Intermediário" },
                        { value: "avancado", label: "Avançado" },
                      ]}
                      error={errors.skills?.[idx]?.level?.message}
                    />
                  )}
                />
              </div>
            </div>

            {idx > 0 && (
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-red-500 cursor-pointer hover:brightness-90"
                onClick={() => remove(idx)}
              >
                <LuTrash2 size={20} className="text-red-500" />
                Excluir
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="text-sm text-primary self-start hover:brightness-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={fields.length >= 10}
          onClick={handleAddSkill}
        >
          + Adicionar conhecimento ou habilidade
        </button>

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

export { SkillsForm };

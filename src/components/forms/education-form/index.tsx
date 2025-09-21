"use client";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { LuTrash2 } from "react-icons/lu";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";

const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: z.string().min(2, "Informe o curso ou formação"),
        institution: z.string().min(2, "Informe a instituição"),
        year: z
          .string()
          .min(4, "Ano inválido")
          .max(4, "Ano inválido")
          .regex(/^\d{4}$/, "Digite um ano válido (ex: 2022)"),
      })
    )
    .min(1, "Adicione pelo menos uma formação")
    .max(5, "Máximo de 5 formações"),
});

type EducationFormValues = z.infer<typeof educationSchema>;

const EducationForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.education as EducationFormValues | undefined;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    mode: "onChange",
    defaultValues: savedData || {
      educations: [{ degree: "", institution: "", year: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("education", watchedData);
    }
  }, [isValid]);

  const handleAddEducation = () => {
    append({ degree: "", institution: "", year: "" });
  };

  const onSubmit = (data: EducationFormValues) => {
    wizardActions.updateFormData("education", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Sua formação</h2>
        <p className="text-sm font-light">
          Adicione seus estudos e cursos que já fez ou está fazendo. Pode ser
          ensino médio, técnico, faculdade ou até cursos rápidos online.
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
            <Input
              label="Curso"
              placeholder="Ensino Médio, Administração, Curso de Informática"
              {...register(`educations.${idx}.degree`)}
            />
            {errors.educations?.[idx]?.degree && (
              <span className="text-red-500 text-xs">
                {errors.educations[idx]?.degree?.message}
              </span>
            )}

            <div className="flex gap-4 max-sm:flex-col">
              <div className="flex-1">
                <Input
                  label="Instituição"
                  placeholder="SENAI, Udemy"
                  {...register(`educations.${idx}.institution`)}
                />
                {errors.educations?.[idx]?.institution && (
                  <span className="text-red-500 text-xs">
                    {errors.educations[idx]?.institution?.message}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <Input
                  label="Ano de Conclusão"
                  placeholder="2022"
                  type="number"
                  {...register(`educations.${idx}.year`)}
                />
                {errors.educations?.[idx]?.year && (
                  <span className="text-red-500 text-xs">
                    {errors.educations[idx]?.year?.message}
                  </span>
                )}
              </div>
            </div>

            {idx > 0 && (
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-red-500 cursor-pointer hover:brightness-90"
                onClick={() => remove(idx)}
              >
                <LuTrash2 size={20} className="text-red-500" />
                Excluir formação
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="text-sm text-primary self-start hover:brightness-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={fields.length >= 5}
          onClick={handleAddEducation}
        >
          + Adicionar formação
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

export { EducationForm };

"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Textarea } from "@/components/fields/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";

const coursesSchema = z.object({
  courses: z
    .string()
    .min(5, "Descreva pelo menos um curso ou atividade extra")
    .max(1000, "Máximo de 1000 caracteres"),
});

type CoursesFormValues = z.infer<typeof coursesSchema>;

const CoursesForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.courses as CoursesFormValues | undefined;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CoursesFormValues>({
    resolver: zodResolver(coursesSchema),
    mode: "onChange",
    defaultValues: savedData || {
      courses: "",
    },
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("courses", watchedData);
    }
  }, [isValid]);

  const onSubmit = (data: CoursesFormValues) => {
    wizardActions.updateFormData("courses", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Cursos e Atividades Extras</h2>
        <p className="text-sm font-light">
          Adicione cursos, oficinas ou atividades que mostram seus aprendizados
          além da sala de aula. Pode ser desde um curso online até participação
          em projetos ou voluntariado.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        <Textarea
          label="Descreva seus cursos e atividades extras"
          placeholder="Curso de Excel básico, Oficina de Empreendedorismo, Voluntariado em ONGs, etc..."
          {...register("courses")}
        />
        {errors.courses && (
          <span className="text-red-500 text-xs">{errors.courses.message}</span>
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

export { CoursesForm };
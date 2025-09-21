"use client";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";
import { LuTrash2 } from "react-icons/lu";

const jobSchema = z.object({
  jobs: z
    .array(
      z.object({
        kind: z.string().min(2, "Informe o tipo de experiência"),
        title: z.string().min(2, "Cargo ou função obrigatório"),
        company: z.string().min(2, "Nome da empresa é obrigatório"),
        period: z.string().min(4, "Informe um período válido"),
        actionsDescriptions: z
          .string()
          .min(5, "Descreva pelo menos uma atividade ou ação"),
        technologies: z
          .string()
          .min(2, "Informe as ferramentas ou tecnologias utilizadas"),
      })
    )
    .min(1, "Adicione pelo menos uma experiência")
    .max(5, "Máximo de 5 experiências"),
});

type JobsFormValues = z.infer<typeof jobSchema>;

const JobsForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.jobs as JobsFormValues | undefined;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<JobsFormValues>({
    resolver: zodResolver(jobSchema),
    mode: "onChange",
    defaultValues: savedData || {
      jobs: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobs",
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("jobs", watchedData);
    }
  }, [isValid]);

  const handleAddJob = () => {
    append({
      kind: "",
      title: "",
      company: "",
      period: "",
      actionsDescriptions: "",
      technologies: "",
    });
  };

  const onSubmit = (data: JobsFormValues) => {
    wizardActions.updateFormData("jobs", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  const handleSkip = () => {
    wizardActions.updateFormData("jobs", { jobs: [] });
    wizardActions.onNextPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Sua Experiência Profissional</h2>
        <p className="text-sm font-light">
          Inclua aqui trabalhos formais ou informais, projetos, atividades de
          voluntariado e até experiências da escola/faculdade. Tudo ajuda a
          mostrar suas habilidades.
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
              label="Tipo de experiência profissional"
              placeholder="Projeto voluntário"
              {...register(`jobs.${idx}.kind`)}
            />
            {errors.jobs?.[idx]?.kind && (
              <span className="text-red-500 text-xs">
                {errors.jobs[idx]?.kind?.message}
              </span>
            )}

            <div className="flex gap-4 max-sm:flex-col">
              <div className="flex-1">
                <Input
                  label="Cargo, função ou projeto"
                  placeholder="Atendente"
                  {...register(`jobs.${idx}.title`)}
                />
                {errors.jobs?.[idx]?.title && (
                  <span className="text-red-500 text-xs">
                    {errors.jobs[idx]?.title?.message}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <Input
                  label="Empresa ou organização"
                  placeholder="ONG Nóiz"
                  {...register(`jobs.${idx}.company`)}
                />
                {errors.jobs?.[idx]?.company && (
                  <span className="text-red-500 text-xs">
                    {errors.jobs[idx]?.company?.message}
                  </span>
                )}
              </div>
            </div>

            <Input
              label="Período"
              placeholder="jan/2023 – dez/2023"
              {...register(`jobs.${idx}.period`)}
            />
            {errors.jobs?.[idx]?.period && (
              <span className="text-red-500 text-xs">
                {errors.jobs[idx]?.period?.message}
              </span>
            )}

            <Input
              label="O que você fez? (2 ou 3 ações principais)"
              placeholder="Atendimento ao público, organização de planilhas, etc..."
              {...register(`jobs.${idx}.actionsDescriptions`)}
            />
            {errors.jobs?.[idx]?.actionsDescriptions && (
              <span className="text-red-500 text-xs">
                {errors.jobs[idx]?.actionsDescriptions?.message}
              </span>
            )}

            <Input
              label="Quais foram as tecnologias ou ferramentas que você utilizou?"
              placeholder="Excel, Canva, Google Drive, etc..."
              {...register(`jobs.${idx}.technologies`)}
            />
            {errors.jobs?.[idx]?.technologies && (
              <span className="text-red-500 text-xs">
                {errors.jobs[idx]?.technologies?.message}
              </span>
            )}

            <button
              type="button"
              className="flex items-center gap-2 text-sm text-red-500 cursor-pointer hover:brightness-90"
              onClick={() => remove(idx)}
            >
              <LuTrash2 size={20} className="text-red-500" />
              Excluir experiência
            </button>
          </div>
        ))}

        <button
          type="button"
          className="text-sm text-primary self-start hover:brightness-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={fields.length >= 5}
          onClick={handleAddJob}
        >
          + Adicionar experiência
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
          <button
            type="button"
            onClick={handleSkip}
            className="px-6 py-3 text-sm cursor-pointer hover:brightness-90"
          >
            Ainda não tenho experiência
          </button>
        </div>
      </form>
    </div>
  );
};

export { JobsForm };

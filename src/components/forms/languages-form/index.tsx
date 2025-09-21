"use client";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";
import { LuTrash2 } from "react-icons/lu";
import { Select } from "@/components/fields/select";

const languagesSchema = z.object({
  languages: z
    .array(
      z.object({
        title: z.string().min(2, "Nome do idioma é obrigatório"),
        level: z.string().min(2, "Nível é obrigatório"),
      })
    )
    .min(1, "Adicione pelo menos um idioma")
    .max(8, "Máximo de 8 idiomas"),
});

type LanguagesFormValues = z.infer<typeof languagesSchema>;

const LanguagesForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.languages as LanguagesFormValues | undefined;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<LanguagesFormValues>({
    resolver: zodResolver(languagesSchema),
    mode: "onChange",
    defaultValues: savedData || {
      languages: [{ title: "", level: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("languages", watchedData);
    }
  }, [isValid]);

  const handleAddLanguage = () => {
    append({ title: "", level: "" });
  };

  const onSubmit = (data: LanguagesFormValues) => {
    wizardActions.updateFormData("languages", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Idiomas</h2>
        <p className="text-sm font-light">
          Adicione aqui os idiomas que você fala e seu nível de conhecimento.
          Até o português entra no currículo e pode fazer diferença.
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
              {/* Campo de Idioma */}
              <div className="flex-1">
                <Input
                  label="Idioma"
                  placeholder="Inglês"
                  {...register(`languages.${idx}.title`)}
                />
                {errors.languages?.[idx]?.title && (
                  <span className="text-red-500 text-xs">
                    {errors.languages[idx]?.title?.message}
                  </span>
                )}
              </div>

              {/* Campo de Nível (usando Controller) */}
              <div className="flex-1">
                <Controller
                  name={`languages.${idx}.level`}
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
                        { value: "fluente", label: "Fluente" },
                        { value: "nativo", label: "Nativo" },
                      ]}
                      error={errors.languages?.[idx]?.level?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Botão de excluir */}
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

        {/* Botão para adicionar */}
        <button
          type="button"
          className="text-sm text-primary self-start hover:brightness-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={fields.length >= 8}
          onClick={handleAddLanguage}
        >
          + Adicionar idioma
        </button>

        {/* Footer - botões navegação */}
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

export { LanguagesForm };

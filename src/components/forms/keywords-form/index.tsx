"use client";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";
import { LuTrash2 } from "react-icons/lu";

const keywordsSchema = z.object({
  keywords: z
    .array(
      z.object({
        value: z
          .string()
          .min(2, "Palavra-chave deve ter pelo menos 2 caracteres"),
      })
    )
    .min(1, "Adicione pelo menos uma palavra-chave")
    .max(10, "Máximo de 10 palavras-chave"),
});

type KeywordsForm = z.infer<typeof keywordsSchema>;

const KeywordsForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.keywords as KeywordsForm | undefined;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<KeywordsForm>({
    resolver: zodResolver(keywordsSchema),
    mode: "onChange",
    defaultValues: savedData || {
      keywords: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("keywords", watchedData);
    }
  }, [isValid]);

  const handleAddKeyword = () => {
    if (fields.length < 10) {
      append({ value: "" });
    }
  };

  const handleRemoveKeyword = (idx: number) => {
    if (fields.length > 1) {
      remove(idx);
    }
  };

  const onSubmit = (data: KeywordsForm) => {
    wizardActions.updateFormData("keywords", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Palavras-chave da sua área</h2>
        <p className="text-sm font-light">
          Escreva palavras que representem suas habilidades, conhecimentos ou
          ferramentas que você domina. Isso ajuda os recrutadores a encontrarem
          você com mais facilidade.
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
          <div key={field.id} className="flex flex-col gap-1">
            <Input
              placeholder="Trabalho em equipe, Canva, Inglês básico"
              {...register(`keywords.${idx}.value`)}
              onRight={() => (
                <button
                  type="button"
                  className="cursor-pointer hover:brightness-90"
                  onClick={() => handleRemoveKeyword(idx)}
                  disabled={fields.length === 1}
                >
                  <LuTrash2
                    className={`text-[18px] ${
                      fields.length === 1 ? "text-gray-300" : "text-red-500"
                    }`}
                  />
                </button>
              )}
            />
            {errors.keywords?.[idx]?.value && (
              <span className="text-red-500 text-xs">
                {errors.keywords[idx]?.value?.message}
              </span>
            )}
          </div>
        ))}

        {errors.keywords && typeof errors.keywords.message === "string" && (
          <span className="text-red-500 text-xs">
            {errors.keywords.message}
          </span>
        )}

        <button
          type="button"
          className="text-sm text-primary self-start hover:brightness-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={fields.length >= 10}
          onClick={handleAddKeyword}
        >
          + Adicionar palavra-chave
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

export { KeywordsForm };

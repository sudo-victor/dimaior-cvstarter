"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

const PersonalForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.personal as PersonalInfoForm | undefined;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: savedData || {
      fullName: "",
      state: "",
      city: "",
      email: "",
      phone: "",
    },
  });

  const watchedData = watch();

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("personal", watchedData);
    }
  }, [isValid]);

  const onSubmit = (data: PersonalInfoForm) => {
    wizardActions.updateFormData("personal", data);
    wizardActions.onNextPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Informações Pessoais</h2>
        <p className="text-sm font-light">
          Preencha suas informações básicas. Esses dados são essenciais para que
          as empresas possam entrar em contato com você.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <Input
          label="Nome completo"
          placeholder="Escreva seu nome completo"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <div className="w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <Input
            label="Estado"
            placeholder="Selecione"
            {...register("state")}
            error={errors.state?.message}
          />
          <Input
            label="Cidade"
            placeholder="Selecione"
            {...register("city")}
            error={errors.city?.message}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <Input
            label="E-mail"
            placeholder="email@mail.com.br"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Telefone"
            placeholder="+55 21 99999-9999"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-fit max-sm:w-full py-3 px-6 flex items-center justify-center border border-[#1C1B1F] text-sm bg-primary rounded-[6px] cursor-pointer hover:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </form>
    </div>
  );
};

export { PersonalForm };

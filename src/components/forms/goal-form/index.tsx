"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { Input } from "@/components/fields/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardActions, useWizardState } from "@/contexts/wizard-context";

const goalsDefault = [
  "🎯  Estágio",
  "💼  Primeiro emprego",
  "🚀  Trainee",
  "⚡  Freela Júnior",
];

const goalSchema = z.object({
  selectedGoal: z.string().min(1, "Selecione um objetivo"),
  customGoal: z.string().optional(),
});

type GoalForm = z.infer<typeof goalSchema>;

const GoalForm = () => {
  const wizardActions = useWizardActions();
  const { formData } = useWizardState();

  const savedData = formData.goal as GoalForm | undefined;
  const [selectedGoal, setSelectedGoal] = useState<string>(
    savedData?.selectedGoal || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
    mode: "onChange",
    defaultValues: savedData || {
      selectedGoal: "",
      customGoal: "",
    },
  });

  const watchedData = watch();

  useEffect(() => {
    register("selectedGoal");
  }, [register]);

  useEffect(() => {
    if (isValid && watchedData) {
      wizardActions.updateFormData("goal", watchedData);
    }
  }, [isValid]);

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal);
    setValue("selectedGoal", goal, { shouldValidate: true, shouldDirty: true });
    setValue("customGoal", "", { shouldValidate: true, shouldDirty: true });
  };

  const handleCustomGoalChange = (value: string) => {
    if (value) {
      setSelectedGoal("");
      setValue("selectedGoal", value, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("customGoal", value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const onSubmit = (data: GoalForm) => {
    wizardActions.updateFormData("goal", data);
    wizardActions.onNextPage();
  };

  const onBack = () => {
    wizardActions.onPreviousPage();
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Qual é o seu objetivo?</h2>
        <p className="text-sm font-light">
          Nos conte qual é o seu objetivo. Assim vamos personalizar seu
          currículo para destacar os pontos mais importantes e aumentar suas
          chances.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          {goalsDefault.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleGoalSelect(goal)}
              className={`w-full px-[18px] py-5 flex text-sm font-light rounded-lg cursor-pointer transition border-2 ${
                selectedGoal === goal
                  ? " border-primary bg-primary/5"
                  : "border-[#d9d9d9] hover:border-primary"
              }`}
            >
              {goal}
            </button>
          ))}
          <Input
            placeholder="Outro..."
            {...register("customGoal")}
            onChange={(e) => handleCustomGoalChange(e.target.value)}
          />
          {errors.selectedGoal && (
            <span className="text-red-500 text-xs">
              {errors.selectedGoal.message}
            </span>
          )}
        </div>

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

export { GoalForm };

"use client";

import Image from "next/image";

import { Progress } from "@/components/ui/progress";

import { ChooseForm } from "@/components/forms/choose-form";
import { useWizardState } from "@/contexts/wizard-context";

export default function Cv() {
  const wizardState = useWizardState();

  return (
    <div className="w-full font-sans p-20 max-sm:px-5">
      <div className="w-full max-w-[550px] mx-auto flex flex-col items-center gap-12">
        <header className="w-full flex flex-col gap-4">
          <div className="flex gap-2 items-end">
            <Image
              src="/dimaior/logo.svg"
              alt="Logo do DiMaior"
              width={107}
              height={23}
            />
            <h1 className="text-xl text-primary font-medium leading-[20px]">
              CV Starter
            </h1>
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex items-end justify-between">
              <p className="text-xs text-[#676767]">Passo {wizardState.currentStep} de {wizardState.totalSteps}</p>
              <p className="text-xs text-[#676767]">
                <strong className="text-xl text-primary">{wizardState.progress}%</strong> Concluído
              </p>
            </div>

            <Progress value={wizardState.progress} />
          </div>
        </header>

        <ChooseForm formName={wizardState.currentPage} />
      </div>
    </div>
  );
}

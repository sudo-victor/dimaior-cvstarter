"use client";
import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";

import { WIZARD_PAGES } from "./utils";
import { WIZARD_CURRENT_PAGE_KEY, WIZARD_FORM_DATA_KEY } from "@/constants/session-constants";

interface WizardContextType {
  currentPage: (typeof WIZARD_PAGES)[number];
  progress: number;
  totalSteps: number;
  currentStep: number;
  formData: Record<string, any>;
  onNextPage: () => void;
  onPreviousPage: () => void;
  canGoTo(direction: "next" | "previous"): boolean;
  navigateToPage: (page: (typeof WIZARD_PAGES)[number]) => void;
  updateFormData: (step: string, data: any) => void;
  resetWizard: () => void;
  isStepValid: (step: string) => boolean;
}

const WizardContext = createContext({} as WizardContextType);

interface WizardProviderProps {
  children: React.ReactNode;
}

export const WizardProvider = ({ children }: WizardProviderProps) => {
  const [currentPage, setCurrentPage] = useState<(typeof WIZARD_PAGES)[number]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(WIZARD_CURRENT_PAGE_KEY);
      return saved && WIZARD_PAGES.includes(saved as any) ? saved as any : "personal";
    }
    return "personal";
  });

  const [formData, setFormData] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(WIZARD_FORM_DATA_KEY);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(WIZARD_CURRENT_PAGE_KEY, currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(WIZARD_FORM_DATA_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const canNavigateTo = useCallback((direction: "next" | "previous") => {
    const currentIndex = WIZARD_PAGES.indexOf(currentPage);
    return direction === "next" 
      ? currentIndex < WIZARD_PAGES.length - 1
      : currentIndex > 0;
  }, [currentPage]);

  const navigateToNext = useCallback(() => {
    if (!canNavigateTo("next")) return;
    const currentIndex = WIZARD_PAGES.indexOf(currentPage);
    setCurrentPage(WIZARD_PAGES[currentIndex + 1]);
  }, [currentPage, canNavigateTo]);

  const navigateToPrevious = useCallback(() => {
    if (!canNavigateTo("previous")) return;
    const currentIndex = WIZARD_PAGES.indexOf(currentPage);
    setCurrentPage(WIZARD_PAGES[currentIndex - 1]);
  }, [currentPage, canNavigateTo]);

  const navigateToPage = useCallback((page: (typeof WIZARD_PAGES)[number]) => {
    if (WIZARD_PAGES.includes(page)) {
      setCurrentPage(page);
    }
  }, []);

  const updateFormData = useCallback((step: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }));
  }, []);

  const isStepValid = useCallback((step: string) => {
    const stepData = formData[step];
    return stepData && Object.keys(stepData).length > 0;
  }, [formData]);

  const resetWizard = useCallback(() => {
    setCurrentPage("personal");
    setFormData({});
    if (typeof window !== "undefined") {
      localStorage.removeItem(WIZARD_CURRENT_PAGE_KEY);
      localStorage.removeItem(WIZARD_FORM_DATA_KEY);
    }
  }, []);

  const progress = useMemo(() => {
    return Math.round(
      ((WIZARD_PAGES.indexOf(currentPage) + 1) / WIZARD_PAGES.length) * 100
    );
  }, [currentPage]);

  const totalSteps = WIZARD_PAGES.length;
  const currentStep = WIZARD_PAGES.indexOf(currentPage) + 1;

  return (
    <WizardContext.Provider
      value={{
        progress,
        currentPage,
        totalSteps,
        currentStep,
        formData,
        onNextPage: navigateToNext,
        onPreviousPage: navigateToPrevious,
        canGoTo: canNavigateTo,
        navigateToPage,
        updateFormData,
        resetWizard,
        isStepValid,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardState = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizardState must be used within a WizardProvider");
  }
  return {
    currentPage: context.currentPage,
    progress: context.progress,
    totalSteps: context.totalSteps,
    currentStep: context.currentStep,
    formData: context.formData,
    isStepValid: context.isStepValid,
  };
};

export const useWizardActions = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizardActions must be used within a WizardProvider");
  }
  return {
    onNextPage: context.onNextPage,
    onPreviousPage: context.onPreviousPage,
    canGoTo: context.canGoTo,
    navigateToPage: context.navigateToPage,
    updateFormData: context.updateFormData,
    resetWizard: context.resetWizard,
  };
};
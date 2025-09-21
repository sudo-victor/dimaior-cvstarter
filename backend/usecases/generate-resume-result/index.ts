import { makeCvPrompt } from "@backend/utils/prompts/make-cv-prompt";
import { openaiClient } from "@backend/lib/openai";

import { ResumeSchema } from "./schema";
import { resumeRepository } from "@backend/repositories/resume-repository";

type Input = {
  userData: string;
};

type Output = {
  ok: boolean;
  data?: any;
  error?: string;
};

export const generateCvResultUsecase = async (
  input: Input
): Promise<Output> => {
  try {
    const prompt = makeCvPrompt({ userData: input.userData });

    const completion = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompt.system,
        },
        { role: "user", content: prompt.user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2500,
    });

    const responseText = completion.choices[0].message?.content;

    if (!responseText) {
      return { ok: false, error: "Resposta vazia da IA" };
    }

    let resumeData;
    try {
      resumeData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Erro ao fazer parse do JSON:", parseError);
      return { ok: false, error: "Erro ao processar resposta da IA" };
    }

    try {
      ResumeSchema.parse(resumeData);
      console.log("[INFO] IA Usage:", completion.usage);
    } catch (validationError) {
      console.error("[ERROR] Erro de validação Zod:", validationError);
      return {
        ok: false,
        error: "Dados não passaram na validação Zod completa",
      };
    }

    try {
      const { error, result } = await resumeRepository.create(resumeData);

      if (error || !result) {
        console.error("[ERROR] Erro ao salvar no Supabase:", error);
        return { ok: false, error: "Falha ao salvar currículo no banco" };
      }

      return { ok: true, data: { ...resumeData, id: result.id } };
    } catch (dbError) {
      console.error("[ERROR] Exception ao salvar no banco:", dbError);
      return { ok: false, error: "Erro interno ao salvar currículo" };
    }
  } catch (error) {
    console.error("[ERROR] Erro na geração do currículo:", error);
    return { ok: false, error: "Erro interno do servidor" };
  }
};

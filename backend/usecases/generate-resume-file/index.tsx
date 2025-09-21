import { PDFTemplate } from "@/lib/pdf-template";
import { pdf } from "@react-pdf/renderer";

import { Resume } from "@/@types/domain/resume";
import { supabaseAdmin } from "@backend/lib/supabase";
import { resumeRepository } from "@backend/repositories/resume-repository";

type Input = {
  resume: Resume & { id?: number };
};

export const generateResumeFileUsecase = async (input: Input) => {
  try {
    if (!input.resume) {
      return { ok: false, error: "Resume data is required" };
    }

    if (input.resume.id) {
      const { result } = await resumeRepository.getFileNameById(
        input.resume.id
      );
      if (!!result?.file_name) {
        const { data: signedUrlData, error: signedUrlError } =
          await supabaseAdmin.storage
            .from("resumes")
            .createSignedUrl(result.file_name, 60 * 10); // 10 minutos

        if (signedUrlError) {
          console.error("Erro ao gerar URL assinada:", signedUrlError);
          return { ok: false, error: "Failed to generate signed URL" };
        }

        return {
          ok: true,
          data: {
            downloadUrl: signedUrlData.signedUrl,
            fileName: result.file_name,
          },
        };
      }
    }

    const pdfBlob = await pdf(<PDFTemplate resume={input.resume} />).toBlob();

    const fileName = `curriculo-${input.resume.contact.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")}-${Date.now()}.pdf`;

    const { data, error } = await supabaseAdmin.storage
      .from("resumes")
      .upload(fileName, pdfBlob, {
        contentType: "application/pdf",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload:", error);
      return { ok: false, error: "Failed to upload PDF" };
    }

    const { data: signedUrlData, error: signedUrlError } =
      await supabaseAdmin.storage
        .from("resumes")
        .createSignedUrl(data.path, 60 * 10); // 10 minutos

    if (signedUrlError) {
      console.error("Erro ao gerar URL assinada:", signedUrlError);
      return { ok: false, error: "Failed to generate signed URL" };
    }

    if (input.resume.id) {
      await resumeRepository.updateFileName(input.resume.id, data.path);
    }

    return {
      ok: true,
      data: {
        fileName: data.path,
        downloadUrl: signedUrlData.signedUrl,
      },
    };
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return { ok: false, error: "Internal server error" };
  }
};

import { NextRequest, NextResponse } from "next/server";

import { Resume } from "@/@types/domain/resume";
import { generateResumeFileUsecase } from "@backend/usecases/generate-resume-file";

export async function POST(req: NextRequest) {
  try {
    const { resume }: { resume: Resume & { id?: number } } = await req.json();

    if (!resume) {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    console.log('type of resume:', typeof resume);

    const result = await generateResumeFileUsecase({ resume });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    const { downloadUrl, fileName } = result.data as any;

    return NextResponse.json({
      success: true,
      fileName,
      downloadUrl,
    });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
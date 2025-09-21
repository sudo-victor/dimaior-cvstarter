import { generateCvResultUsecase } from "@backend/usecases/generate-resume-result";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    console.log("Received formData:", formData);

    const result = await generateCvResultUsecase({
      userData: JSON.stringify(formData, null, 2),
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "Erro desconhecido", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { resume: result.data, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro na geração do currículo:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

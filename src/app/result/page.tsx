"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LuCircleCheckBig } from "react-icons/lu";

import { useWizardState } from "@/contexts/wizard-context";
import { LoadingView } from "@/components/loading-view";
import { Resume } from "@/@types/domain/resume";
import {
  RESUME_KEY,
  WIZARD_CURRENT_PAGE_KEY,
  WIZARD_FORM_DATA_KEY,
} from "@/constants/session-constants";

const checklistAts = [
  "Formato PDF padrão",
  "Títulos de seção padrão",
  "Informações de contato claras",
  "Fontes legíveis",
  "Palavras-chave incluídas",
  "Sem foto (recomendado)",
];

export default function Result() {
  const { formData } = useWizardState();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const hasGenerated = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(RESUME_KEY);
    if (stored) {
      setResume(JSON.parse(stored));
      setLoading(false);
      return;
    }

    if (hasGenerated.current) return;
    hasGenerated.current = true;

    const generate = async () => {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData }),
        });

        const data = await res.json();
        if (data.success) {
          setResume(data.resume);
          localStorage.setItem(RESUME_KEY, JSON.stringify(data.resume));
        }
      } catch (err) {
        console.error("Erro ao gerar currículo:", err);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [formData]);
  if (loading || !resume) return <LoadingView />;

  const downloadPDF = async () => {
    if (!resume || downloading) return;

    setDownloading(true);

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar PDF");
      }

      const link = document.createElement("a");
      link.href = data.downloadUrl;
      link.target = "_blank";
      link.download = data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("PDF gerado:", data.downloadUrl);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full font-sans p-20 max-sm:px-5">
      <div className="w-full max-w-[550px] mx-auto flex flex-col items-center gap-8">
        <header className="w-full flex flex-col items-center gap-4">
          <div className="flex gap-2 items-end">
            <Image
              src="/dimaior/logo.svg"
              alt="Logo do DiMaior"
              width={107}
              height={23}
            />
            <p className="text-xl text-primary font-medium leading-[20px]">
              CV Starter
            </p>
          </div>

          <h2 className="font-medium text-2xl max-sm:text-center">
            Prontinho! Seu currículo tá no grau! 😉
          </h2>
        </header>

        <div
          ref={pdfRef}
          className="flex flex-col gap-6 px-7 py-8 rounded-[26px] bg-[#FAFAFA]"
        >
          {/* Header com dados de contato */}
          <header className="flex flex-col gap-[5px]">
            <h1 className="text-xl font-semibold text-[#2A2A2C]">
              {resume.contact.name}
            </h1>
            <p className="text-xs text-[#3B8A6F]">{resume.linkedinHeadline}</p>
            <ul className="flex flex-col gap-0 text-xs font-light">
              <li>{resume.contact.location}</li>
              <li>{resume.contact.email}</li>
              <li>{resume.contact.phone}</li>
            </ul>
          </header>

          <hr className="border-gray-300" />

          {/* Resumo */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-[#2A2A2C]">Resumo</h2>
            <p className="text-xs font-light text-[#424242]">
              {resume.summary}
            </p>
            <span className="text-xs text-[#3B8A6F] font-medium">
              💡 Otimizado pra colocar na descrição do LinkedIn também!
            </span>
          </section>

          <hr className="border-gray-300" />

          {/* Educação */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-[#2A2A2C]">Educação</h2>
            <div className="flex flex-col gap-4">
              {resume.education.map((edu, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-xs font-normal text-[#424242]">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-light text-[#424242]">
                    {edu.institution} - {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-300" />

          {/* Experiência */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-[#2A2A2C]">
              Experiência
            </h2>
            <div className="flex flex-col gap-4">
              {resume.experience.map((exp, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <h3 className="text-xs font-normal text-[#424242]">
                    {exp.title} {exp.company && `- ${exp.company}`}
                  </h3>
                  <ul className="flex flex-col gap-1 list-inside list-disc">
                    {exp.description.map((desc, descIndex) => (
                      <li
                        key={descIndex}
                        className="text-xs font-light text-[#424242]"
                      >
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-300" />

          {/* Habilidades */}
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-[#2A2A2C]">
              Habilidades
            </h2>
            <div className="flex items-center gap-[10px] flex-wrap">
              {resume.skills.technical.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 rounded-full bg-primary text-xs text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Idiomas (se existir) */}
          {resume.languages && resume.languages.length > 0 && (
            <>
              <hr className="border-gray-300" />
              <section className="flex flex-col gap-2">
                <h2 className="text-xs font-semibold text-[#2A2A2C]">
                  Idiomas
                </h2>
                <div className="flex flex-col gap-2">
                  {resume.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-xs font-light text-[#424242]">
                        {lang.language}
                      </span>
                      <span className="text-xs font-light text-[#424242]">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {resume.courses && (
            <>
              <hr className="border-gray-300" />
              <section className="flex flex-col gap-2">
                <h2 className="text-xs font-semibold text-[#2A2A2C]">
                  Cursos e Certificações
                </h2>
                <p className="text-xs font-light text-[#424242]">
                  {resume.courses}
                </p>
              </section>
            </>
          )}
        </div>

        <div className="flex flex-col gap-6 px-7 py-8 rounded-[26px] border border-[#E3E3E3]">
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-[#424242] text-[22px] flex items-center gap-[10px]">
              <LuCircleCheckBig className="text-primary" />
              Checklist de ATS
            </h3>
            <p className="text-xs font-light text-[#424242]">
              Seu currículo já está no formato ideal para os filtros ATS!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {checklistAts.map((item) => (
              <p key={item} className="flex items-center gap-2 text-sm">
                <LuCircleCheckBig className="text-primary" /> {item}
              </p>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center gap-4 max-sm:flex-col max-sm:gap-3">
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="w-full py-3 px-6 flex items-center justify-center border border-[#1C1B1F] text-sm bg-primary rounded-[6px] text-white cursor-pointer hover:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            {downloading ? "Gerando PDF..." : "Baixar currículo"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(RESUME_KEY);
              localStorage.removeItem(WIZARD_FORM_DATA_KEY);
              localStorage.removeItem(WIZARD_CURRENT_PAGE_KEY);
              window.location.href = "/";
            }}
            className="w-full py-3 px-6 flex items-center justify-center border border-[#1C1B1F] text-sm bg-white rounded-[6px] cursor-pointer hover:brightness-90 transition"
          >
            Fazer novamente
          </button>
        </div>
      </div>
    </div>
  );
}

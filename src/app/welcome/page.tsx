"use client";

import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center font-sans px-5 py-8">
      <div className="w-full max-w-[508px] mx-auto flex flex-col items-center gap-8 max-sm:gap-6">
        <header className="w-full flex flex-col gap-4 items-center max-sm:gap-3">
          <span className="w-fit px-4 py-1 bg-green-100 text-green-500 text-sm rounded-full max-sm:text-xs max-sm:px-3">
            Ferramenta 100% gratuita
          </span>
          <div className="flex gap-2 items-end max-sm:flex-col max-sm:items-center max-sm:gap-2">
            <Image
              src="/dimaior/logo.svg"
              alt="Logo do DiMaior"
              width={172}
              height={32}
              className="max-sm:w-[140px] max-sm:h-auto"
            />
            <h1 className="text-3xl text-primary font-medium max-sm:text-2xl">
              CV Starter
            </h1>
          </div>
        </header>

        <Image
          src="/assets/cv.png"
          alt="Capelo"
          width={180}
          height={197}
          sizes="(max-width: 640px) 140px, 180px"
        />

        <div className="flex flex-col items-center gap-4 max-sm:gap-3">
          <h2 className="text-base font-medium leading-8 text-center max-sm:text-sm max-sm:leading-6">
            Crie rapidamente seu primeiro currículo profissional, do jeito certo
            para a vaga de trabalho que está buscando!
          </h2>
          <p className="text-base font-light leading-8 text-center max-sm:text-sm max-sm:leading-6">
            Em poucos passos simples e intuitivos, você pode destacar suas
            conquistas, atrair mais oportunidades e fortalecer sua presença no
            mercado de trabalho.
          </p>
        </div>

        <Link
          href="/cv"
          className="w-full max-w-[318px] max-sm:max-w-full flex items-center justify-center p-4 max-sm:p-3 border border-[#1C1B1F] text-sm max-sm:text-base bg-primary text-white rounded-[6px] cursor-pointer hover:brightness-75 transition disabled:opacity-50 font-medium"
        >
          Bora começar!
        </Link>

        <span className="text-xs text-[#9C9C9C] font-light text-center max-sm:text-[11px] max-sm:leading-4 max-sm:px-2">
          *Os dados fornecidos neste formulário serão utilizados exclusivamente
          para fins de análise e personalização de sua experiência. Garantimos a
          confidencialidade e a segurança das suas informações, conforme nossa{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="font-medium text-foreground/50 underline"
          >
            política de privacidade
          </Link>{" "}
          e{" "}
          <Link
            href="/terms"
            target="_blank"
            className="font-medium text-foreground/50 underline"
          >
            termos de uso
          </Link>
          .
        </span>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { WizardProvider } from "@/contexts/wizard-context";

const lexendDecaSans = Lexend_Deca({
  variable: "--font-lexend-deca-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "CV Starter da DiMaior | Crie seu currículo otimizado para o futuro",
  description:
    "O DiMaior CV Starter ajuda você a criar um currículo profissional otimizado para filtros ATS, usando seu perfil baseado no modelo RIASEC. Descubra carreiras em alta e conquiste oportunidades no mercado de trabalho.",
  keywords: [
    "currículo",
    "CV fácil",
    "criar currículo",
    "modelo RIASEC",
    "DiMaior CV Starter",
    "profissões do futuro",
    "gerador de currículo",
    "mercado de trabalho",
    "emprego jovem",
    "primeiro emprego",
  ],
  authors: [{ name: "Di Maior" }],
  creator: "Di Maior",
  publisher: "Di Maior",
  openGraph: {
    title: "DiMaior CV Starter | Crie seu currículo otimizado para o futuro",
    description:
      "Descubra seu perfil RIASEC e crie um currículo profissional otimizado para vagas e filtros ATS. Ideal para jovens em busca do 1º emprego ou novas carreiras em alta.",
    url: "https://cvstarter.dimaior.net.br",
    siteName: "DiMaior CV Starter",
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "https://cvstarter.dimaior.net.br",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDecaSans.variable} antialiased`}>
        <WizardProvider>
          <>{children}</>
        </WizardProvider>
        <Toaster />
      </body>
    </html>
  );
}

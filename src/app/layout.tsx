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
  title: "DiMaior | VocaTest",
  description:
    "Quer entender melhor seu perfil e encontrar a carreira certa?Com base no Modelo RIASEC, o Di Maior VocaTest revela seu perfil e sugere carreiras alinhadas, além de apresentar novas profissões do futuro em alta no mercado.",
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

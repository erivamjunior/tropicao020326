import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestão de Obras",
  description: "Sistema simples de gestão de projetos de infraestrutura com Amplify"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

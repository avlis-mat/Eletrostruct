import "~/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "~/_components/ThemeProvider";

export const metadata: Metadata = {
  title: "Eletrostruct - Maior Empresa de Eletrônicos da UnB ",
  description: "Os Melhores Preços do Mercado!",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning para o botao dark funcionar
    <html lang="pt-BR" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        {/*O ThemeProvider envolve o site inteiro*/}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

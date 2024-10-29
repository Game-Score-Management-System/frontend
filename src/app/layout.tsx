import "./globals.css";
import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import { Montserrat } from "next/font/google"
import { ReduxProvider } from "@/store/provider";
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Game Score Manager",
  description: "Únete a Game Score Manager, la plataforma ideal para jugadores que quieren llevar un registro de sus puntuaciones y competir por los primeros puestos en el ranking global. Registra tus puntajes de manera automática mientras juegas, consulta tus estadísticas, y mejora tu perfil para dominar las tablas de clasificación."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.className} antialiased  dark text-foreground bg-background`}
      >
        <Toaster />
        <SessionProvider >
          <NextUIProvider>
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </NextUIProvider>
        </SessionProvider >
      </body>
    </html>
  );
}

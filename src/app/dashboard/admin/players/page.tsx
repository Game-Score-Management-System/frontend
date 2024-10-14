import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Gestión de Jugadores'
}


export default function PlayersAdminPage() {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Gestión de Jugadores 🎮
      </h2>
    </>
  );
}
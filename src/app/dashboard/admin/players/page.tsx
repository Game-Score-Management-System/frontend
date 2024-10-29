import UserList from "@/app/ui/components/UserList";
import { Metadata } from "next";
import { auth } from "@auth"

export const metadata: Metadata = {
  title: 'Gestión de Jugadores'
}

export default async function PlayersAdminPage() {
  const session = await auth();

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Gestión de Jugadores 🎮
      </h2>
      <UserList />
    </>
  );
}
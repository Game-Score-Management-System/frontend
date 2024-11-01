import UserList from "@/app/ui/components/UserList";
import { Metadata } from "next";
import { auth } from "@auth"
import { getDataApi } from "@/app/lib/actions/http";
import { User } from "@/app/ui/models/User.model";

export const metadata: Metadata = {
  title: 'Gestión de Jugadores'
}

export default async function PlayersAdminPage() {
  const session = await auth();

  if (!session || !session.user.token) return null;

  const response = await getDataApi<User[]>('users/admin', session?.user.token).catch((error) => {
    console.error('🔴🔴🔴🔴🔴🔴🔴', error);
  });

  if (!response) return null

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Gestión de Jugadores 🎮
      </h2>
      <UserList users={response?.result} />
    </>
  );
}
import { fetchDataApi } from "@/app/lib/utils";
import EditProfile from "@components/EditProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mi Perfil'
}

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const profile = await fetchDataApi(`users/profile/${params.userId}`);
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Mi Perfil 😎
      </h2>
      <EditProfile user={profile} />
    </>
  );
}
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mi Perfil'
}


export default function ProfilePage() {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Mi Perfil 😎
      </h2>
    </>
  );
}
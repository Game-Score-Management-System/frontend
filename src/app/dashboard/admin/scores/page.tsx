import ScoreList from "@/app/ui/components/ScoreList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Gestión de scores'
}


export default async function ScoresAdminPage() {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Gestión de Scores 🔝
      </h2>
      <ScoreList />
    </>
  );
}
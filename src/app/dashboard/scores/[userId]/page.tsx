// import { fetchDataApi } from "@/app/lib/utils";
// import OwnRankingPositionCard from "@/app/ui/components/OwnRankingPositionCard";
// import { Score } from "@/app/ui/models/Score.model";
import SelectorGame from "@/app/ui/components/SelectorGame";
import UserScores from "@/app/ui/components/UserScores";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mis Puntuaciones'
}


export default async function ScoresPage({ params }: { params: { userId: string } }) {
  // const data = await fetchDataApi('users/scores/' + params.userId) as Score[];
  // console.log(data);
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Mis Puntuaciones 🎯
      </h2>

      <SelectorGame />
      <UserScores userId={params.userId}></UserScores>

    </>
  );
}
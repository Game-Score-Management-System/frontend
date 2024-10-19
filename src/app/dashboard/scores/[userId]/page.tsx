import { fetchDataApi } from "@/app/lib/utils";
import OwnRankingPositionCard from "@/app/ui/components/OwnRankingPositionCard";
import { Score } from "@/app/ui/models/Score.model";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mis Puntuaciones'
}


export default async function ScoresPage({ params }: { params: { userId: string } }) {
  const data = await fetchDataApi('users/scores/' + params.userId) as Score[];
  console.log(data);
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Mis Puntuaciones 🎯
      </h2>
      <section className="grid  gap-5">
        {
          data.map(({ id, score, user, game }) => {
            return <OwnRankingPositionCard
              key={id}
              title={`Tus resultados en ${game}`}
              profilePicture={user.profilePicture}
              score={score}
              username={user.username}
            />
          })
        }
      </section>
    </>
  );
}
'use client'

import { useGetScoresByIdUserQuery } from "@/store/services/apiSlice";
import OwnRankingPositionCard from "./OwnRankingPositionCard";

export default function UserScores({ userId }: { userId: string }) {
  const { data, isLoading } = useGetScoresByIdUserQuery({ id: userId, page: 1, limit: 10 });


  if (!data || isLoading) {
    return null;
  }

  return (
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
  );
}
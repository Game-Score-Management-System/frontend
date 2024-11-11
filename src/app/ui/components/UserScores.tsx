'use client'

import { useGetScoresByIdUserQuery } from "@/store/services/apiSlice";
import OwnRankingPositionCard from "./OwnRankingPositionCard";
import { useAppSelector } from "../hooks/useStore";
import EmptyContent from "./EmptyContent";

export default function UserScores({ userId }: { userId: string }) {
  const selectedGame = useAppSelector(state => state.game.selectedGame);
  const { data, isLoading } = useGetScoresByIdUserQuery({ id: userId, game: selectedGame, page: 1, limit: 10 });

  if (!data || isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-100"></div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <EmptyContent message="No tienes puntuaciones en este juego" />
    )
  }

  return (
    <section className="grid  gap-5">
      {
        data.map(({ id, score, user, game, createdAt }) => {
          return <OwnRankingPositionCard
            key={id}
            title={`Tus resultados en ${game}`}
            profilePicture={user.profilePicture}
            score={score}
            username={user.username}
            scoreDate={createdAt}
          />
        })
      }
    </section>
  );
}
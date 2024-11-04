'use client'

import { useGetScoresByIdUserQuery } from "@/store/services/apiSlice";
import OwnRankingPositionCard from "./OwnRankingPositionCard";
import { useAppSelector } from "../hooks/useStore";
import { Image } from "@nextui-org/react";

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
      <div className="flex flex-col items-center justify-center bg-transparent/40 rounded-full size-80 p-5">
        <Image
          src="/alien.png"
          alt="Imagen no encontro elementos"
          width={150}
          height={150}
        />
        <p className="text-center text-sn text-slate-100 mb-4">No tienes puntuaciones en este juego</p>
      </div>
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
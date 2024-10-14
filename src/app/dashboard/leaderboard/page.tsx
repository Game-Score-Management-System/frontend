import { fetchDataApi } from '@/app/lib/utils';
import OwnRankingPositionCard from '@/app/ui/components/OwnRankingPositionCard';
import RankTable from '@/app/ui/components/RankTable';
import SelectorGame from '@/app/ui/components/SelectorGame';
import { Leaderboard } from '@/app/ui/models/Leaderboard.model';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clasificación'
}

const columns = [
  'Posición',
  'Usuario',
  'Puntos'
]

export default async function LeaderboardPage() {
  const data = await fetchDataApi('scores/leaderboard') as Leaderboard[];
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Clasificación 🏆
      </h2>
      <SelectorGame />
      <OwnRankingPositionCard title='Tus resultados en Tetris' position={100} />
      <RankTable columnNames={columns} data={data} />
    </>

  );
}


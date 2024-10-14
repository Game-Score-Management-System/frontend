import { fetchDataApi } from '@/app/lib/utils';
import OwnRankingPositionCard from '@/app/ui/components/OwnRankingPositionCard';
import RankTable from '@/app/ui/components/RankTable';
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
  const data = await fetchDataApi('scores/leaderboard');
  console.log("🎯🎯🎯🎯🎯🎯🎯", data);
  return (
    <div className='flex flex-col items-center mb-20 gap-7'>
      <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-100">
        Clasificación 🏆
      </h2>

      <OwnRankingPositionCard />
      <RankTable columnNames={columns} data={data} />
    </div>

  );
}


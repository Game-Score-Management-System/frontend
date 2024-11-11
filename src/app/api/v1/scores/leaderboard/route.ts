// import { SCORE_DATA } from '@/app/lib/data';
// import { Leaderboard } from '@/app/ui/models/Leaderboard.model';
// import { User } from '@/app/ui/models/User.model';
import { NextResponse } from 'next/server';

export async function GET() {
  // const usersInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/admin`);
  // const usersData = await usersInfo.json();

  // const scoresInfo = SCORE_DATA.map((userScore) => {
  //   const userInfo = usersData.find(
  //     (userData: { id: string }) => userData.id === userScore.userId
  //   ) as User;
  //   return {
  //     score: userScore.score,
  //     game: userScore.game,
  //     user: {
  //       ...userInfo
  //     }
  //   };
  // }).toSorted((a, b) => b.score - a.score);
  // console.log('🌱🌱🌱🌱', scoresInfo);

  return NextResponse.json({});
}

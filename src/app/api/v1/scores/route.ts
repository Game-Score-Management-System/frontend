import { SCORE_DATA, USERS_DATA } from '@/app/lib/data';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function GET() {
  const scoreWuthUserInfo = SCORE_DATA.map((userScore) => {
    const userInfo = USERS_DATA.find((user) => user.id === userScore.userId);
    return {
      ...userScore,
      user: {
        ...userInfo
      }
    };
  });

  return NextResponse.json(scoreWuthUserInfo);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newId = randomUUID();
  const newScore = {
    scoreId: newId,
    userId: body.userId,
    score: body.score,
    game: body.game,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };
  const newScores = SCORE_DATA.concat(newScore);
  return NextResponse.json(newScores);
}

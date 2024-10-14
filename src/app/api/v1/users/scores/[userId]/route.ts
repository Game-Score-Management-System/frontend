import { SCORE_DATA, USERS_DATA } from '@/app/lib/data';
import { NextResponse } from 'next/server';

type Params = {
  userId: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const { userId } = context.params;
  const userScores = SCORE_DATA.filter((score) => score.userId === userId);
  const user = USERS_DATA.find((user) => user.id === userId);

  const newUserScores = userScores.map((score) => {
    return {
      ...score,
      user
    };
  });
  return NextResponse.json(newUserScores);
}

import { SCORE_DATA } from '@/app/lib/data';
import { NextResponse } from 'next/server';

type Params = {
  userId: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const { userId } = context.params;
  const userScores = SCORE_DATA.filter((score) => score.userId === userId);
  return NextResponse.json(userScores);
}

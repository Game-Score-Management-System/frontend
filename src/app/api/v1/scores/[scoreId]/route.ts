import { SCORE_DATA } from '@/app/lib/data';
import { NextResponse } from 'next/server';

type Params = {
  scoreId: string;
};

export async function GET(request: Request, context: { params: Params }) {
  console.log('🌱🌱🌱🌱', context.params);
}

export async function DELETE(request: Request, context: { params: Params }) {
  const { scoreId } = context.params;
  const scores = SCORE_DATA.filter((score) => score.scoreId !== scoreId);
  return NextResponse.json(scores);
}

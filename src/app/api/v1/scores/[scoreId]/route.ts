import { SCORE_DATA } from '@/app/lib/data';
import { NextResponse } from 'next/server';

type Params = {
  scoreId: string;
};

export async function GET(request: Request, context: { params: Params }) {
  console.log('🌱🌱🌱🌱', context.params);
  return NextResponse.json({});
}

export async function DELETE(request: Request, context: { params: Params }) {
  const { scoreId } = context.params;
  const scores = SCORE_DATA.filter((score) => score.id !== scoreId);
  return NextResponse.json(scores);
}

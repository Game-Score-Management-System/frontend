import { USERS_DATA } from '@/app/lib/data';
import { NextResponse } from 'next/server';

type Params = {
  userId: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const { userId } = context.params;
  const userScores = USERS_DATA.find((user) => user.id === userId);
  return NextResponse.json(userScores);
}

export async function PUT(request: Request, context: { params: Params }) {
  const { userId } = context.params;
  const user = USERS_DATA.find((user) => user.id === userId);
  const body = await request.json();
  const updatedUser = { ...user, ...body };
  return NextResponse.json(updatedUser);
}

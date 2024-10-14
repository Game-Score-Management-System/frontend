import { USERS_DATA } from '@/app/lib/data';
import { NextResponse } from 'next/server';

type Params = {
  userId: string;
};

export async function GET(request: Request) {
  console.log(request);
  return NextResponse.json({
    data: USERS_DATA
  });
}

export async function DELETE(request: Request, context: { params: Params }) {
  const { userId } = context.params;
  const user = USERS_DATA.find((user) => user.id === userId);
  return NextResponse.json(user);
}

export async function PUT(request: Request, context: { params: Params }) {
  const { userId } = context.params;
  const user = USERS_DATA.find((user) => user.id === userId);
  const body = await request.json();
  const updatedUser = { ...user, ...body };
  return NextResponse.json(updatedUser);
}

import { USERS_DATA } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log(request);
  return NextResponse.json(USERS_DATA);
}

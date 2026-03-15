import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Успешный выход' });
  
  response.cookies.set('rzd-auth', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}

import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function setLoginSession(user: any) {
  const sessionToken = user.id; 
  const cookie = serialize('rzd-auth', sessionToken, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  const response = NextResponse.json({ message: 'Успешный вход' });
  response.headers.append('Set-Cookie', cookie);
  return response;
}


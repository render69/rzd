// lib/auth.ts
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function setLoginSession(user: any) {
  const sessionToken = user.id;  // Можно использовать JWT или другие методы
  const cookie = serialize('rzd-auth', sessionToken, {
    httpOnly: true, // Безопасность
    secure: process.env.NODE_ENV === 'production', // Использовать secure флаг в продакшене
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: '/',
  });

  const response = NextResponse.json({ message: 'Успешный вход' });
  response.headers.append('Set-Cookie', cookie);
  return response;
}


import { NextResponse } from 'next/server';
import { dbPromise } from '../../../lib/db';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const db = await dbPromise;

  // Проверяем пользователя в базе данных
  const user = await db.get('SELECT * FROM User WHERE username = ?', [username]);
  if (!user || password !== user.password) {
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
  }

  // Устанавливаем куки
  const res = NextResponse.json({ message: 'Успешный вход' });
  res.cookies.set('rzd-auth', user.id, {
    httpOnly: true,
    path: '/',
  });

  return res;
}

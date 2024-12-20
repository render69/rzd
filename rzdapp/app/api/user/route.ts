// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { dbPromise } from '../../../lib/db';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie')?.split(';').find((c) => c.trim().startsWith('rzd-auth='));
  const userId = cookie?.split('=')[1]; // Извлекаем userId из cookie

  if (!userId) {
    return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
  }

  const db = await dbPromise;
  const user = await db.get('SELECT * FROM User WHERE id = ?', [userId]);

  if (!user) {
    return NextResponse.json({ message: 'Пользователь не найден' }, { status: 401 });
  }

  return NextResponse.json(user);
}

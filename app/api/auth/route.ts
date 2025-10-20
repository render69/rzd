import { NextResponse } from 'next/server';
import { dbPromise } from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { username, password } = await req.json();
    const db = await dbPromise;

    const user = await db.get('SELECT * FROM User WHERE username = ?', [username]);
    if (!user) {
        return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
    }

    const res = NextResponse.json({ message: 'Успешный вход' });
    res.cookies.set('rzd-auth', user.id.toString(), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return res;
}

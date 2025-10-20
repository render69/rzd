import { NextResponse } from 'next/server';
import { dbPromise } from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { username, password, name, surname, patronymic, email, phone, post, experience } = await req.json();
        const db = await dbPromise;

        const existingUser = await db.get(
            'SELECT * FROM User WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser) {
            return NextResponse.json({
                message: 'Пользователь с таким логином или email уже существует'
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.run(
            `INSERT INTO User (username, password, name, surname, patronymic, email, phone, post, experience, avatar) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [username, hashedPassword, name, surname || '', patronymic || '', email, phone, post || '', experience || 0, '/img/default-avatar.jpg']
        );

        return NextResponse.json({
            message: 'Пользователь успешно зарегистрирован',
            userId: result.lastID
        });

    } catch (error) {
        console.error('Ошибка регистрации:', error);
        return NextResponse.json({
            message: 'Ошибка сервера при регистрации'
        }, { status: 500 });
    }
}

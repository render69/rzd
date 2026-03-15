import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        patronymic: true,
        post: true,
        email: true,
        phone: true,
        avatar: true,
      },
    });

    const formatted = users.map((u) => ({
      id: u.id,
      name: `${u.name} ${u.surname}`.trim(),
      role: u.post || 'Не указано',
      email: u.email,
      phone: u.phone,
      image: u.avatar || '/img/default-avatar.jpg',
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return new NextResponse('Ошибка при получении пользователей', { status: 500 });
  }
}

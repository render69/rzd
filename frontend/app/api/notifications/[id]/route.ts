import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      console.log('PATCH вызван с id:', params.id);
  
      const id = Number(params.id);
      if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'Некорректный ID' }, { status: 400 });
      }
  
      const updated = await prisma.notification.update({
        where: { id },
        data: { read: true },
      });
  
      console.log('Успешно обновлено:', updated);
      return NextResponse.json(updated);
    } catch (error: any) {
      console.error('Ошибка в PATCH route:', error?.message, error?.stack);
      return NextResponse.json({ error: 'Ошибка сервера', detail: error?.message }, { status: 500 });
    }
  }
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.notification.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ошибка при удалении' }, { status: 500 });
  }
}

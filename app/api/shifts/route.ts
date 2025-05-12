import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // импортируем prisma
import { PrismaClient } from '@prisma/client'; // импортируем PrismaClient для типизации

// Типизация для смены (если она не была импортирована ранее)
interface Shift {
  id: number;
  startTime: string;
  endTime: string;
  type: 'Дневная' | 'Ночная';
}

export async function GET() {
  try {
    const shifts = await prisma.shifts.findMany(); // получаем список смен
    return NextResponse.json(shifts); // возвращаем данные в формате JSON
  } catch (error) {
    return NextResponse.error();
  }
}

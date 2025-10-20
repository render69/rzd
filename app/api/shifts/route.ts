import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
interface Shift {
  id: number;
  startTime: string;
  endTime: string;
  type: 'Дневная' | 'Ночная';
}

export async function GET() {
  try {
    const shifts = await prisma.shifts.findMany();
    return NextResponse.json(shifts);
  } catch (error) {
    return NextResponse.error();
  }
}

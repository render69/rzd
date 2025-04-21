'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Shift {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    type: 'Дневная' | 'Ночная';
    status: 'Текущая' | 'Предстоящая' | 'Прошедшая';
}

const ShiftCard = ({ shift }: { shift: Shift }) => {
    const [expanded, setExpanded] = useState(false);

    const now = new Date();
    const shiftStart = new Date(`${shift.date}T${shift.startTime}`);
    const shiftEnd = new Date(`${shift.date}T${shift.endTime}`);
    if (shiftEnd < shiftStart) shiftEnd.setDate(shiftEnd.getDate() + 1); // Ночная смена

    const diffHours = Math.round((shiftStart.getTime() - now.getTime()) / (1000 * 60 * 60));
    const timeHint = shift.status === 'Предстоящая'
        ? `Через ${diffHours} ч`
        : shift.status === 'Прошедшая'
        ? `${Math.abs(diffHours)} ч назад`
        : 'Идёт сейчас';

    return (
        <div
            className="p-4 bg-white/70 dark:bg-white-900/70 rounded-lg shadow-lg border-2 border-red-500 transition transform hover:scale-[1.02] cursor-pointer"
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className={`text-3xl mr-3 ${shift.type === 'Дневная' ? 'text-yellow-500' : 'text-blue-500'}`}>
                        {shift.type === 'Дневная' ? '☀️' : '🌙'}
                    </span>
                    <div>
                        <p className="text-lg font-semibold">{shift.date}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{shift.startTime} – {shift.endTime}</p>
                    </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{timeHint}</span>
            </div>

            {expanded && (
                <div className="mt-3 text-xm text-red-600 animate-fade-in">
                    <p>Тип: <span className={`font-medium ${shift.type === 'Дневная' ? 'text-yellow-500' : 'text-blue-500'}`}>{shift.type}</span></p>
                    <p>Статус: <span className={`font-medium ${shift.status === 'Текущая' ? 'text-red-600' : shift.status === 'Предстоящая' ? 'text-green-600' : 'text-gray-500'}`}>{shift.status}</span></p>
                    {shift.status === 'Текущая' && (
                        <Link href="/lk/tasks">
                            <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm">
                                Перейти к задачам
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

const SchedulePage = () => {
    const [filterStatus, setFilterStatus] = useState<'Все' | 'Предстоящая' | 'Прошедшая'>('Все');

    const testShifts: Shift[] = [
        { id: 1, date: '2024-12-09', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Текущая' },
        { id: 2, date: '2024-12-10', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 3, date: '2024-12-11', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 4, date: '2024-12-12', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 5, date: '2024-12-13', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 6, date: '2024-12-08', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Прошедшая' },
        { id: 7, date: '2024-12-07', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Прошедшая' },
    ];

    const currentShift = testShifts.find(shift => shift.status === 'Текущая');
    const otherShifts = testShifts.filter(shift => shift.status !== 'Текущая' &&
        (filterStatus === 'Все' || shift.status === filterStatus));

    return (
        <div className="p-6 m-4 bg-white/50 dark:bg-white-800/50 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            <div className="p-1 bg-white/90 dark:bg-white-700/70 rounded-lg mb-4 text-center border-2 border-red-500">
                <h1 className="text-3xl font-semibold text-red-500">Ваше расписание смен</h1>
            </div>

            {currentShift && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2 text-red-600">🟢 Текущая смена</h2>
                    <ShiftCard shift={currentShift} />
                </div>
            )}

            <div className="flex justify-center gap-4 mb-6">
                {['Все', 'Предстоящая', 'Прошедшая'].map(status => (
                    <button
                        key={status}
                        className={`px-4 py-2 rounded-full border-2 ${
                            filterStatus === status ? 'bg-red-500 text-white' : 'border-red-500 text-white'
                        } hover:bg-red-600 hover:text-red-200 transition`}
                        onClick={() => setFilterStatus(status as any)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherShifts.length > 0 ? (
                    otherShifts.map(shift => (
                        <ShiftCard key={shift.id} shift={shift} />
                    ))
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">Нет смен по фильтру.</p>
                )}
            </div>
        </div>
    );
};

export default SchedulePage;

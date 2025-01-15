'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Shift {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    type: 'Дневная' | 'Ночная';
    status: 'Текущая' | 'Предстоящая' | 'Прошедшая';
}

const ShiftCard = ({ shift }: { shift: Shift }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow border border-red-500">
            <div className="flex items-center">
                <span className={`mr-2 text-xl ${shift.type === 'Дневная' ? 'text-yellow-500' : 'text-blue-500'}`}>
                    {shift.type === 'Дневная' ? '☀️' : '🌙'}
                </span>
                <p className="font-medium">Дата: {shift.date}</p>
            </div>
            <p>Время: {shift.startTime} - {shift.endTime}</p>
            <p>Тип: {shift.type}</p>
        </div>
    );
};

const SchedulePage = () => {
    const [filterStatus, setFilterStatus] = useState<'Все' | 'Текущая' | 'Предстоящая' | 'Прошедшая'>('Все');

    const testShifts: Shift[] = [
        { id: 1, date: '2024-12-09', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Текущая' },
        { id: 2, date: '2024-12-10', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 3, date: '2024-12-11', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 4, date: '2024-12-12', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 5, date: '2024-12-13', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 6, date: '2024-12-08', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Прошедшая' },
        { id: 7, date: '2024-12-07', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Прошедшая' },
    ];

    const filteredShifts = filterStatus === 'Все' ? testShifts : testShifts.filter(shift => shift.status === filterStatus);

    return (
        <div className="p-6 m-4 bg-white bg-opacity-50 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            <div className="p-1 bg-white bg-opacity-90 rounded-lg mb-1 text-center border-2 border-red-500">
                <h1 className="text-3xl font-semibold text-red-500">Ваше расписание смен</h1>
            </div>

            {/* Фильтрация смен */}
            <div className="mb-6 text-center">
                <select
                    className="bg-white border border-red-500 rounded-lg p-2"
                    onChange={(e) => setFilterStatus(e.target.value as 'Все' | 'Текущая' | 'Предстоящая' | 'Прошедшая')}
                    value={filterStatus}
                >
                    <option value="Все">Все смены</option>
                    <option value="Текущая">Текущая смена</option>
                    <option value="Предстоящая">Предстоящие смены</option>
                    <option value="Прошедшая">Прошедшие смены</option>
                </select>
            </div>

            {/* Текущая смена */}
            {testShifts.some(shift => shift.status === 'Текущая') && (
                <div className="mb-6 p-4 bg-opacity-90 bg-red-100 rounded-lg shadow border border-red-500">
                    <h2 className="text-xl font-medium mb-2">Текущая смена</h2>
                    {testShifts.filter(shift => shift.status === 'Текущая').map(shift => (
                        <ShiftCard key={shift.id} shift={shift} />
                    ))}
                    <Link href="/lk/tasks">
                        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Просмотреть текущие задачи
                        </button>
                    </Link>
                </div>
            )}

            {/* Остальные смены */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShifts.map(shift => (
                    <ShiftCard key={shift.id} shift={shift} />
                ))}
            </div>
        </div>
    );
};

export default SchedulePage;

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
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-red-500 transform hover:scale-105">
            <div className="flex items-center mb-4">
                <span className={`mr-3 text-4xl ${shift.type === 'Дневная' ? 'text-yellow-500' : 'text-blue-500'}`}>
                    {shift.type === 'Дневная' ? '☀️' : '🌙'}
                </span>
                <div>
                    <p className="text-xl font-semibold">{shift.date}</p>
                    <p className="text-sm text-gray-500">{shift.startTime} - {shift.endTime}</p>
                </div>
            </div>
            <div className="text-gray-700">
                <p>Тип: <span className={`font-medium ${shift.type === 'Дневная' ? 'text-yellow-500' : 'text-blue-500'}`}>{shift.type}</span></p>
                <p>Статус: <span className={`font-medium ${shift.status === 'Текущая' ? 'text-red-600' : shift.status === 'Предстоящая' ? 'text-green-600' : 'text-gray-500'}`}>{shift.status}</span></p>
            </div>
        </div>
    );
};

const SchedulePage = () => {
    const [filterStatus, setFilterStatus] = useState<'Все' | 'Текущая' | 'Предстоящая' | 'Прошедшая'>('Все');
    const [filterType, setFilterType] = useState<'Все' | 'Дневная' | 'Ночная'>('Все');

    const testShifts: Shift[] = [
        { id: 1, date: '2024-12-09', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Текущая' },
        { id: 2, date: '2024-12-10', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 3, date: '2024-12-11', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 4, date: '2024-12-12', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 5, date: '2024-12-13', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 6, date: '2024-12-08', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Прошедшая' },
        { id: 7, date: '2024-12-07', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Прошедшая' },
    ];

    const filteredShifts = testShifts
        .filter(shift => (filterStatus === 'Все' || shift.status === filterStatus) && (filterType === 'Все' || shift.type === filterType));

    return (
        <div className="p-6 m-4 bg-white bg-opacity-50 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            <div className="p-1 bg-white bg-opacity-90 rounded-lg mb-4 text-center border-2 border-red-500">
                <h1 className="text-3xl font-semibold text-red-500">Ваше расписание смен</h1>
            </div>

            {/* Фильтрация смен */}
            <div className="m-4 text-center space-x-4">
                <select
                    className="bg-white border-2 border-red-500 rounded-lg p-2"
                    onChange={(e) => setFilterStatus(e.target.value as 'Все' | 'Текущая' | 'Предстоящая' | 'Прошедшая')}
                    value={filterStatus}
                >
                    <option value="Все">Все смены</option>
                    <option value="Текущая">Текущая смена</option>
                    <option value="Предстоящая">Предстоящие смены</option>
                    <option value="Прошедшая">Прошедшие смены</option>
                </select>
                <select
                    className="bg-white border-2 border-red-500 rounded-lg p-2"
                    onChange={(e) => setFilterType(e.target.value as 'Все' | 'Дневная' | 'Ночная')}
                    value={filterType}
                >
                    <option value="Все">Все типы смен</option>
                    <option value="Дневная">Дневные смены</option>
                    <option value="Ночная">Ночные смены</option>
                </select>
            </div>

            {/* Текущая смена */}
            {testShifts.some(shift => shift.status === 'Текущая') && (
                <div className="mb-6 p-4 bg-opacity-90 bg-red-100 rounded-lg shadow border-2 border-red-500">
                    <h2 className="text-xl font-medium mb-2">Текущая смена</h2>
                    {testShifts.filter(shift => shift.status === 'Текущая').map(shift => (
                        <ShiftCard key={shift.id} shift={shift} />
                    ))}
                    <Link href="/lk/tasks">
                        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                            Просмотреть текущие задачи
                        </button>
                    </Link>
                </div>
            )}

            {/* Остальные смены */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShifts.length > 0 ? (
                    filteredShifts.map(shift => (
                        <ShiftCard key={shift.id} shift={shift} />
                    ))
                ) : (
                    <p className="text-center text-gray-600">Нет доступных смен по выбранным фильтрам.</p>
                )}
            </div>
        </div>
    );
};

export default SchedulePage;

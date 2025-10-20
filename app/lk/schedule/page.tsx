'use client';

import Link from 'next/link';
import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FaCalendarAlt, FaSun, FaMoon, FaClock } from 'react-icons/fa';

interface Shift {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    type: 'Дневная' | 'Ночная';
    status: 'Текущая' | 'Предстоящая' | 'Прошедшая';
}

const ShiftCard = ({ shift }: { shift: Shift }) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'Текущая':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    badge: 'bg-red-100 text-red-800'
                };
            case 'Предстоящая':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    badge: 'bg-green-100 text-green-800'
                };
            case 'Прошедшая':
                return {
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    text: 'text-gray-800',
                    badge: 'bg-gray-100 text-gray-800'
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    text: 'text-gray-800',
                    badge: 'bg-gray-100 text-gray-800'
                };
        }
    };

    const statusConfig = getStatusConfig(shift.status);

    return (
        <Card hover className={`${statusConfig.bg} ${statusConfig.border} border-2`}>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {shift.type === 'Дневная' ? (
                            <FaSun className="text-2xl text-yellow-500" />
                        ) : (
                            <FaMoon className="text-2xl text-blue-500" />
                        )}
                        <div>
                            <p className="text-lg font-semibold text-gray-900">{shift.date}</p>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <FaClock className="text-gray-400" />
                                <span>{shift.startTime} - {shift.endTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.badge}`}>
                        {shift.status}
                    </div>
                </div>
                
                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Тип смены:</span>
                        <span className={`font-medium ${shift.type === 'Дневная' ? 'text-yellow-600' : 'text-blue-600'}`}>
                            {shift.type}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const SchedulePage = () => {
    const [filterStatus, setFilterStatus] = useState<'Все' | 'Текущая' | 'Предстоящая' | 'Прошедшая'>('Все');
    const [filterType, setFilterType] = useState<'Все' | 'Дневная' | 'Ночная'>('Все');

    const testShifts: Shift[] = [
        { id: 1, date: '2025-06-18', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Текущая' },
        { id: 2, date: '2025-06-16', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 3, date: '2025-06-17', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 4, date: '2025-06-18', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 5, date: '2025-06-19', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 6, date: '2025-06-14', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Прошедшая' },
        { id: 7, date: '2025-06-13', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Прошедшая' },
        { id: 8, date: '2025-06-12', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Прошедшая' },
        { id: 9, date: '2025-06-20', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 10, date: '2025-06-21', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 11, date: '2025-06-22', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 12, date: '2025-06-23', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 13, date: '2025-06-24', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 14, date: '2025-06-25', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 15, date: '2025-06-26', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 16, date: '2025-06-27', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 17, date: '2025-06-28', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 18, date: '2025-06-29', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 19, date: '2025-06-30', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 20, date: '2025-07-01', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 21, date: '2025-07-02', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 22, date: '2025-07-03', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 23, date: '2025-07-04', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
        { id: 24, date: '2025-07-05', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
        { id: 25, date: '2025-07-06', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
    ];

    const filteredShifts = testShifts
        .filter(shift => (filterStatus === 'Все' || shift.status === filterStatus) && (filterType === 'Все' || shift.type === filterType));

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaCalendarAlt className="mr-3 text-[#C8050E]" />
                        Ваше расписание смен
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Управление рабочими сменами</p>
                </div>

                <Card>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <select
                                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C8050E] focus:outline-none bg-white"
                                onChange={(e) => setFilterStatus(e.target.value as 'Все' | 'Текущая' | 'Предстоящая' | 'Прошедшая')}
                                value={filterStatus}
                            >
                                <option value="Все">Все смены</option>
                                <option value="Текущая">Текущая смена</option>
                                <option value="Предстоящая">Предстоящие смены</option>
                                <option value="Прошедшая">Прошедшие смены</option>
                            </select>
                            <select
                                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#C8050E] focus:outline-none bg-white"
                                onChange={(e) => setFilterType(e.target.value as 'Все' | 'Дневная' | 'Ночная')}
                                value={filterType}
                            >
                                <option value="Все">Все типы смен</option>
                                <option value="Дневная">Дневные смены</option>
                                <option value="Ночная">Ночные смены</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {testShifts.some(shift => shift.status === 'Текущая') && (
                    <Card className="bg-red-50 border-red-200 border-2">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-red-800 flex items-center">
                                <FaClock className="mr-2 text-red-600" />
                                Текущая смена
                            </h2>
                            {testShifts.filter(shift => shift.status === 'Текущая').map(shift => (
                                <ShiftCard key={shift.id} shift={shift} />
                            ))}
                            <Link href="/lk/tasks" className="block">
                                <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                                    Просмотреть текущие задачи
                                </Button>
                            </Link>
                        </div>
                    </Card>
                )}

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-2 border-gray-200 pb-2 bg-gray-50 rounded-xl px-4 py-2">Все смены</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredShifts.length > 0 ? (
                            filteredShifts.map(shift => (
                                <ShiftCard key={shift.id} shift={shift} />
                            ))
                        ) : (
                            <Card className="col-span-full text-center py-12">
                                <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">Нет смен</h3>
                                <p className="text-gray-500">По выбранным фильтрам смен не найдено</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;


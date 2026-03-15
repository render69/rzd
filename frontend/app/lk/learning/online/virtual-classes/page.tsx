'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaVideo, FaUsers, FaClock, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

interface VirtualClass {
    id: string;
    title: string;
    mentor: string;
    date: string;
    time: string;
    participants: number;
    maxParticipants: number;
    status: 'active' | 'completed' | 'upcoming';
    description: string;
}

const mockClasses: VirtualClass[] = [
    {
        id: '1',
        title: 'Основы безопасности на железной дороге',
        mentor: 'Иванов И.И.',
        date: '2024-03-20',
        time: '14:00',
        participants: 12,
        maxParticipants: 20,
        status: 'active',
        description: 'Изучение базовых принципов безопасности при работе на железной дороге'
    },
    {
        id: '2',
        title: 'Управление локомотивом: практика',
        mentor: 'Петров П.П.',
        date: '2024-03-19',
        time: '10:00',
        participants: 15,
        maxParticipants: 15,
        status: 'completed',
        description: 'Практические занятия по управлению локомотивом'
    },
    {
        id: '3',
        title: 'Маневровая работа',
        mentor: 'Сидоров С.С.',
        date: '2024-03-25',
        time: '15:30',
        participants: 8,
        maxParticipants: 20,
        status: 'upcoming',
        description: 'Техники и методы маневровой работы на станции'
    }
];

interface VirtualClassCardProps {
    virtualClass: VirtualClass;
}

const VirtualClassCard: React.FC<VirtualClassCardProps> = ({ virtualClass }) => {
    const statusColors = {
        active: 'bg-green-100 text-green-800',
        completed: 'bg-gray-100 text-gray-800',
        upcoming: 'bg-blue-100 text-blue-800'
    };

    const statusIcons = {
        active: FaVideo,
        completed: FaCheckCircle,
        upcoming: FaCalendarAlt
    };

    const StatusIcon = statusIcons[virtualClass.status];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-500 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-red-600">{virtualClass.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[virtualClass.status]}`}>
                    <StatusIcon className="inline-block mr-1" />
                    {virtualClass.status === 'active' ? 'Активно' : 
                     virtualClass.status === 'completed' ? 'Завершено' : 'Предстоит'}
                </span>
            </div>
            <p className="text-gray-600 mb-4">{virtualClass.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                    <FaUsers className="text-red-500 mr-2" />
                    <span>{virtualClass.participants}/{virtualClass.maxParticipants} участников</span>
                </div>
                <div className="flex items-center">
                    <FaClock className="text-red-500 mr-2" />
                    <span>{virtualClass.time}</span>
                </div>
            </div>
            <div className="text-gray-600 mb-4">
                <p>Ментор: {virtualClass.mentor}</p>
                <p>Дата: {new Date(virtualClass.date).toLocaleDateString('ru-RU')}</p>
            </div>
            {virtualClass.status === 'active' && (
                <Link href={`/lk/learning/online/virtual-classes/${virtualClass.id}`}>
                    <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                        Присоединиться к занятию
                    </button>
                </Link>
            )}
        </div>
    );
};

const VirtualClassesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'upcoming'>('active');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [classes, setClasses] = useState<VirtualClass[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                setIsLoading(true);
                setClasses(mockClasses);
            } catch (err) {
                setError('Не удалось загрузить занятия. Пожалуйста, попробуйте позже.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const filteredClasses = classes.filter(cls => cls.status === activeTab);

    if (error) {
        return (
            <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
                <div className="text-center text-red-600">
                    <p className="text-xl font-semibold mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Загрузка занятий...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-red-600">Виртуальные занятия</h1>
                <Link href="/lk/learning/online">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Назад
                    </button>
                </Link>
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'active'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Активные занятия
                </button>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'upcoming'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Предстоящие занятия
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'completed'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Завершенные занятия
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.length === 0 ? (
                    <div className="col-span-full text-center text-gray-600 py-8">
                        Нет доступных занятий
                    </div>
                ) : (
                    filteredClasses.map((virtualClass) => (
                        <VirtualClassCard key={virtualClass.id} virtualClass={virtualClass} />
                    ))
                )}
            </div>
        </div>
    );
};

export default VirtualClassesPage; 
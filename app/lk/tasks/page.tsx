'use client';

import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FaTasks, FaCalendarAlt, FaCheckCircle, FaClock, FaPlay, FaRedo } from 'react-icons/fa';

interface Task {
    id: number;
    title: string;
    deadline: string;
    status: 'В процессе' | 'Ожидает' | 'Завершено';
    description: string;
}

const TasksPage = () => {
    const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Проверка вагонов', deadline: '2024-12-02', status: 'В процессе', description: 'Провести проверку всех вагонов в депо и обеспечить их готовность.' },
        { id: 2, title: 'Отчёт о безопасности', deadline: '2024-12-04', status: 'В процессе', description: 'Подготовить отчёт о соблюдении норм безопасности на предприятии.' },
        { id: 3, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает', description: 'Проверить техническое состояние оборудования на складе.' },
        { id: 4, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает', description: 'Проверить исправность приборов на производстве.' },
        { id: 5, title: 'Проверка', deadline: '2024-12-05', status: 'В процессе', description: 'Проверить рабочие параметры станков на предприятии.' },
        { id: 6, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает', description: 'Провести плановую проверку всех оборудования.' },
        { id: 7, title: 'Проверка оборудования 6', deadline: '2024-12-05', status: 'Завершено', description: 'Заключительный этап проверки оборудования на исправность.' },
        { id: 8, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Завершено', description: 'Проверить оборудование на производственном участке.' },
        { id: 9, title: 'Проверка оборудования 2', deadline: '2024-12-05', status: 'Завершено', description: 'Проверка функциональности всего оборудования.' },
    ]);

    const [filter, setFilter] = useState<'Все' | Task['status']>('Все');

    const getStatusConfig = (status: Task['status']) => {
        switch (status) {
            case 'В процессе':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-800',
                    icon: <FaClock className="text-yellow-600" />,
                    badge: 'bg-yellow-100 text-yellow-800'
                };
            case 'Ожидает':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    icon: <FaTasks className="text-red-600" />,
                    badge: 'bg-red-100 text-red-800'
                };
            case 'Завершено':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    icon: <FaCheckCircle className="text-green-600" />,
                    badge: 'bg-green-100 text-green-800'
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    text: 'text-gray-800',
                    icon: <FaTasks className="text-gray-600" />,
                    badge: 'bg-gray-100 text-gray-800'
                };
        }
    };

    const toggleDescription = (id: number) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

    const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    const resetTaskStatus = (taskId: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: 'В процессе' } : task
            )
        );
    };

    const finishTask = (taskId: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: 'Завершено' } : task
            )
        );
    };

    const filterTasks = (status: 'Все' | Task['status']) => {
        setFilter(status);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'Все') return true;
        return task.status === filter;
    });

    const filterTasksByStatus = (status: Task['status']) => {
        return filteredTasks.filter(task => task.status === status);
    };

    const getFilterButtonStyle = (status: 'Все' | Task['status']) => {
        const isActive = filter === status;
        const baseStyle = 'px-4 py-2 rounded-lg font-medium transition-all duration-200';

        if (isActive) {
            return `${baseStyle} bg-[#C8050E] text-white shadow-md`;
        }

        switch (status) {
            case 'Все':
                return `${baseStyle} bg-gray-100 text-gray-700 hover:bg-gray-200`;
            case 'В процессе':
                return `${baseStyle} bg-yellow-100 text-yellow-700 hover:bg-yellow-200`;
            case 'Ожидает':
                return `${baseStyle} bg-red-100 text-red-700 hover:bg-red-200`;
            case 'Завершено':
                return `${baseStyle} bg-green-100 text-green-700 hover:bg-green-200`;
            default:
                return `${baseStyle} bg-gray-100 text-gray-700 hover:bg-gray-200`;
        }
    };

    return (
        <div className="min-h-screen p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaTasks className="mr-3 text-[#C8050E]" />
                        Задачи и поручения
                    </h1>
                    <p className="text-xl text-gray-600">Управление рабочими задачами</p>
                </div>

                <Card>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            variant={filter === 'Все' ? 'primary' : 'ghost'}
                            onClick={() => filterTasks('Все')}
                            className="flex items-center space-x-2"
                        >
                            <FaTasks />
                            <span>Все задачи</span>
                        </Button>
                        <Button
                            variant={filter === 'В процессе' ? 'primary' : 'ghost'}
                            onClick={() => filterTasks('В процессе')}
                            className="flex items-center space-x-2"
                        >
                            <FaClock />
                            <span>В процессе</span>
                        </Button>
                        <Button
                            variant={filter === 'Ожидает' ? 'primary' : 'ghost'}
                            onClick={() => filterTasks('Ожидает')}
                            className="flex items-center space-x-2"
                        >
                            <FaTasks />
                            <span>Ожидает</span>
                        </Button>
                        <Button
                            variant={filter === 'Завершено' ? 'primary' : 'ghost'}
                            onClick={() => filterTasks('Завершено')}
                            className="flex items-center space-x-2"
                        >
                            <FaCheckCircle />
                            <span>Завершено</span>
                        </Button>
                    </div>
                </Card>

                <div className="space-y-8">
                    {[
                        { title: 'Текущие задачи', status: 'В процессе' as const, icon: <FaClock className="text-yellow-600" /> },
                        { title: 'Ожидающие задачи', status: 'Ожидает' as const, icon: <FaTasks className="text-red-600" /> },
                        { title: 'Завершённые задачи', status: 'Завершено' as const, icon: <FaCheckCircle className="text-green-600" /> },
                    ].map((section) => {
                        const sectionTasks = filterTasksByStatus(section.status);
                        if (sectionTasks.length === 0) return null;

                        return (
                            <div key={section.title}>
                                <Card className="mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                                        {section.icon}
                                        <span className="ml-3">{section.title}</span>
                                        <span className="ml-auto bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            {sectionTasks.length}
                                        </span>
                                    </h2>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sectionTasks.map(task => {
                                        const statusConfig = getStatusConfig(task.status);

                                        return (
                                            <Card
                                                key={task.id}
                                                hover
                                                className={`${statusConfig.bg} ${statusConfig.border} border-2 cursor-pointer`}
                                                onClick={() => toggleDescription(task.id)}
                                            >
                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                                <FaCalendarAlt className="text-gray-400" />
                                                                <span>{task.deadline}</span>
                                                            </div>
                                                        </div>
                                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.badge}`}>
                                                            {task.status}
                                                        </div>
                                                    </div>

                                                    {expandedTaskId === task.id && (
                                                        <div className="pt-3 border-t border-gray-200">
                                                            <p className="text-sm text-gray-700">{task.description}</p>
                                                        </div>
                                                    )}

                                                    <div className="pt-3 border-t border-gray-200">
                                                        <div className="flex gap-2">
                                                            {task.status === 'В процессе' && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        finishTask(task.id);
                                                                    }}
                                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                                >
                                                                    <FaCheckCircle className="mr-1" />
                                                                    Завершить
                                                                </Button>
                                                            )}
                                                            {task.status === 'Ожидает' && (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        updateTaskStatus(task.id, 'В процессе');
                                                                    }}
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                                                >
                                                                    <FaPlay className="mr-1" />
                                                                    Начать
                                                                </Button>
                                                            )}
                                                            {task.status === 'Завершено' && (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        resetTaskStatus(task.id);
                                                                    }}
                                                                    className="border-gray-300 text-gray-700 hover:bg-gray-500"
                                                                >
                                                                    <FaRedo className="mr-1" />
                                                                    Исправить
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredTasks.length === 0 && (
                    <Card className="text-center py-12">
                        <FaTasks className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Нет задач</h3>
                        <p className="text-gray-500">По выбранному фильтру задач не найдено</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default TasksPage;

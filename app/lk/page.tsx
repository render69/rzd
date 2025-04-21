// app/lk/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


interface User {
    id: number;
    username: string;
    position: string;
    avatar: string;
    name: string;
    experience: string;
    email: string;
    phone: string;
    address: string;
}

const Lk = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const notifications = [
        { title: 'Смена на завтра', details: 'У вас назначена смена на завтра с 8:00 до 16:00.' },
        { title: 'Инструктаж', details: 'Не забудьте пройти инструктаж по технике безопасности.' },
        { title: 'Собрание отдела', details: 'Собрание отдела в пятницу в 14:00 в комнате 305.' },
    ];
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const toggleDetails = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };
    const [user, setUser] = useState<User | null>(null);
    const weather = {
        temp: 22,
        description: "Облачно",
        humidity: 65,
        windSpeed: 5.4,
        icon: "04d",
    };

    const router = useRouter();
    const data = [
        { name: 'Январь', задачи: 80, смены: 90 },
        { name: 'Февраль', задачи: 85, смены: 88 },
        { name: 'Март', задачи: 90, смены: 92 },
        { name: 'Апрель', задачи: 95, смены: 94 },
        { name: 'Май', задачи: 100, смены: 98 },
    ];
    const achievementData = [
        { name: 'Январь', achievements: 20 },
        { name: 'Февраль', achievements: 40 },
        { name: 'Март', achievements: 60 },
        { name: 'Апрель', achievements: 80 },
        { name: 'Май', achievements: 100 },
    ];
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                router.push('/');
            }
        };

        fetchUser();
    }, [router]);

    if (!user) return <div>Загрузка...</div>;

    return (
        <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            <div className="flex items-center mb-6 border-2 border-red-500 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0">
                    {user.avatar ? (
                        <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-500 rounded-full" />
                    )}
                </div>
                <div className="ml-5">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">Роль: {user.position}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border-2 border-red-500">
                    <h2 className="text-xl font-semibold text-red-600">Сегодня ваша смена</h2>
                    <p className="text-gray-700">Дневная смена</p>
                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Подробнее
                    </button>
                </div>

                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border-2 border-red-500">
                    <h2 className="text-xl font-semibold text-red-600">Ваши задачи</h2>
                    <p className="text-gray-700">3 активные задачи</p>
                    <Link href="/lk/tasks">
                        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Открыть задачи
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border-2 border-red-500 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-red-600">Достижения</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Посетил 100 смен</li>
                            <li>Выполнил 200 задач</li>
                            <li>Участвовал в 10 тренингах по безопасности</li>
                            <li>Получил 5 благодарностей от руководства</li>
                            <li>Сдал квалификационный экзамен на 95%</li>
                        </ul>
                        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Подробнее
                        </button>
                    </div>
                    <div className="w-1/2">
                        <LineChart width={300} height={200} data={achievementData}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="achievements" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>

                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border-2 border-red-500 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-red-600">Статистика</h2>
                        <p className="text-gray-700">Задачи: 80% выполнено</p>
                        <p className="text-gray-700">Смены: 90% посещено</p>
                        <div className="bg-gray-100 p-4 rounded-md mt-4">
                            <h3 className="font-semibold text-gray-800">Дополнительная информация</h3>
                            <ul className="list-disc pl-5">
                                <li>Процесс выполнения задач в целом идет согласно плану.</li>
                                <li>Общее количество смен в этом месяце: 25.</li>
                                <li>План на следующую неделю: повышение активности.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <LineChart width={400} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="задачи" stroke="#8884d8" />
                            <Line type="monotone" dataKey="смены" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-4 border-2 border-red-500">
                <div className="mb-4 text-center">
                    <h3 className="border-b border-red-500 text-xl font-semibold text-red-600">Уведомления</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {notifications.map((note, index) => (
                        <li
                            key={index}
                            className="bg-white rounded-lg shadow border-2 border-red-400 p-3 hover:shadow-lg transition-all duration-200 text-sm"
                        >
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => toggleDetails(index)}
                                    className="text-left text-gray-700 font-medium hover:bg-gray-300 bg-gray-200 rounded-lg px-2 py-1"
                                >
                                    📌 {note.title}
                                </button>
                                {expandedIndexes.includes(index) && (
                                    <p className="text-gray-600 text-sm">{note.details}</p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-medium'>✔</button>
                                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium'>👁️</button>
                                    <button className='bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium'>✖</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Lk;

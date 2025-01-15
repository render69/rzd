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
    const [user, setUser] = useState<User | null>(null);
    const [notifications, setNotifications] = useState<string[]>(['Обновление графика смен', 'Новое поручение от руководителя', 'Новое поручение от руководителя', 'Новое поручение от руководителя']);
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
            <div className="flex items-center mb-6 border border-red-500 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border border-red-500">
                    <h2 className="text-xl font-semibold text-red-600">Сегодня ваша смена</h2>
                    <p className="text-gray-700">Дневная смена</p>
                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Подробнее
                    </button>
                </div>

                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border border-red-500">
                    <h2 className="text-xl font-semibold text-red-600">Ваши задачи</h2>
                    <p className="text-gray-700">3 активные задачи</p>
                    <Link href="/lk/tasks">
                        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Открыть задачи
                        </button>
                    </Link>
                </div>

                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border border-red-500 grid grid-cols-3">
                    <div>

                    <h2 className="text-xl font-semibold text-red-600">Погода</h2>
                    <p className="text-gray-700">{weather.temp}°C — {weather.description}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <i className="fas fa-tint text-blue-500 mr-2"></i>
                            <p className="text-gray-600">Влажность: {weather.humidity}%</p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-wind text-gray-600 mr-2"></i>
                            <p className="text-gray-600">Ветер: {weather.windSpeed} м/с</p>
                        </div>
                    </div>
                    <div className="mt-4 border border-red-500 w-16 h-16">
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                            alt={weather.description}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border border-red-500 flex justify-between items-center">
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

                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border border-red-500 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
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
            <div className="mt-8">
                <div className="p-1 bg-white rounded-lg mb-1 text-center border-2 border-red-500">
                    <h3 className="text-2xl font-semibold text-red-500">Уведомления:</h3>
                </div>
                <ul className="space-y-1 mt-2">
                    {notifications.map((note, index) => (
                        <li key={index} className="p-2 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-red-500">
                            {note}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Lk;

// app/lk/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


interface User {
    id: number;
    username: string;
    post: string;
    avatar: string;
    name: string;
    experience: string;
    email: string;
    phone: string;
    address: string;
}

type Notification = {
    id: number;
    title: string;
    details: string;
    read: boolean;
};

// Добавляем интерфейс для модального окна
interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    notificationTitle: string;
}

// Компонент модального окна
const DeleteModal = ({ isOpen, onClose, onConfirm, notificationTitle }: DeleteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border-2 border-red-500">
                <h3 className="text-xl font-semibold text-red-600 mb-4">Подтверждение удаления</h3>
                <p className="text-gray-700 mb-6">
                    Вы уверены, что хотите удалить уведомление "{notificationTitle}"?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

const Lk = () => {
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null); // Состояние для отслеживания раскрытого уведомления

    const handleToggle = (id: number) => {
        // Переключаем состояние раскрытия уведомления
        setExpandedNoteId(prevId => (prevId === id ? null : id));
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Функция для получения уведомлений
    async function fetchNotifications() {
        const res = await fetch('/api/notifications');
        const data = await res.json();
        setNotifications(data);
    }

    // Функция для пометки уведомления как прочитанное
    async function markAsRead(id: number) {
        try {
            const res = await fetch(`/api/notifications/${id}`, {
                method: 'PATCH',
            });

            if (!res.ok) throw new Error('Ошибка при пометке как прочитанное');

            // Обновляем состояние локально
            setNotifications((prev) =>
                prev.map((note) => (note.id === id ? { ...note, read: true } : note))
            );
        } catch (err) {
            console.error(err);
        }
    }

    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        notificationId: number | null;
        notificationTitle: string;
    }>({
        isOpen: false,
        notificationId: null,
        notificationTitle: '',
    });

    // Функция для удаления уведомления
    async function deleteNotification(id: number) {
        try {
            const res = await fetch(`/api/notifications/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Ошибка при удалении уведомления');

            // Обновляем состояние локально, удаляя уведомление из списка
            setNotifications((prev) => prev.filter((note) => note.id !== id));
            // Закрываем модальное окно
            setDeleteModal({ isOpen: false, notificationId: null, notificationTitle: '' });
        } catch (err) {
            console.error(err);
            alert('Произошла ошибка при удалении уведомления');
        }
    }

    // Функция для открытия модального окна
    const openDeleteModal = (id: number, title: string) => {
        setDeleteModal({
            isOpen: true,
            notificationId: id,
            notificationTitle: title,
        });
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
                    <p className="text-sm text-gray-600">Роль: {user.post}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border-2 border-red-500">
                    <h2 className="text-xl font-semibold text-red-600">Сегодня ваша смена</h2>
                    <p className="text-gray-700">Дневная смена</p>
                    <Link href="/lk/schedule">
                        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Подробнее
                        </button>
                    </Link>
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
                <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border-2 border-red-500 grid grid-cols-2">
                    <div>
                        <h2 className="text-xl font-semibold text-red-600">Погода</h2>
                        <p className="text-gray-700">Температура: {weather.temp}°C — {weather.description}</p>
                        <p className="text-gray-700"></p>
                        <p className="text-gray-600">Влажность: {weather.humidity}%</p>
                        <p className="text-gray-600">Ветер: {weather.windSpeed} м/с</p>
                    </div>                    
                    <div className="flex items-center justify-center">
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                            alt={weather.description}
                            className="w-32 h-16 object-cover"
                        />
                    </div>
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

            {/* Добавляем модальное окно */}
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, notificationId: null, notificationTitle: '' })}
                onConfirm={() => deleteModal.notificationId && deleteNotification(deleteModal.notificationId)}
                notificationTitle={deleteModal.notificationTitle}
            />

            <div className="mt-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-4 border-2 border-red-500">
                <div className="mb-4 text-center">
                    <h3 className="border-b border-red-500 text-xl font-semibold text-red-600">Уведомления</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {notifications.map((note) => (
                        <li
                            key={note.id}
                            className={`rounded-lg shadow border-2 p-3 hover:shadow-lg transition-all duration-200 text-sm ${note.read ? 'bg-green-100 border-green-400' : 'bg-white border-red-400'}`}
                        >
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-700 font-medium">📌 {note.title}</p>
                                {expandedNoteId === note.id && (
                                    <p className="text-gray-600 text-sm">{note.details}</p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => markAsRead(note.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium"
                                    >
                                        👁️
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(note.id, note.title)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium"
                                    >
                                        ✖
                                    </button>
                                    <button
                                        onClick={() => handleToggle(note.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium"
                                    >
                                        {expandedNoteId === note.id ? 'Свернуть' : 'Развернуть'}
                                    </button>
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

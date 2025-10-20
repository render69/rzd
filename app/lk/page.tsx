'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { 
  FaCalendarAlt, 
  FaTasks, 
  FaChartLine, 
  FaTrophy, 
  FaCloudSun, 
  FaBell, 
  FaTrash, 
  FaEye, 
  FaEyeSlash, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    patronymic: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    experience: number;
    post: string;
    email: string;
    phone: string;
    avatar: string;
    teamId?: number;
}

type Notification = {
    id: number;
    title: string;
    details: string;
    read: boolean;
    createdAt: string;
};

const DashboardPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        notificationId: number | null;
        notificationTitle: string;
    }>({
        isOpen: false,
        notificationId: null,
        notificationTitle: '',
    });
    const router = useRouter();

    const weather = {
        temp: 22,
        description: "Облачно",
        humidity: 65,
        windSpeed: 5.4,
        icon: "04d",
    };

    const data = [
        { name: 'Янв', задачи: 80, смены: 90 },
        { name: 'Фев', задачи: 85, смены: 88 },
        { name: 'Мар', задачи: 90, смены: 92 },
        { name: 'Апр', задачи: 95, смены: 94 },
        { name: 'Май', задачи: 100, смены: 98 },
    ];

    const achievementData = [
        { name: 'Январь', achievements: 20 },
        { name: 'Февраль', achievements: 40 },
        { name: 'Март', achievements: 60 },
        { name: 'Апрель', achievements: 80 },
        { name: 'Май', achievements: 100 },
    ];

    const pieData = [
        { name: 'Выполнено', value: 75, color: '#C8050E' },
        { name: 'В процессе', value: 20, color: '#FFA500' },
        { name: 'Ожидает', value: 5, color: '#6B7280' },
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
        fetchNotifications();
    }, [router]);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            const data = await res.json();
            setNotifications(data);
        } catch (error) {
            console.error('Ошибка загрузки уведомлений:', error);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            const res = await fetch(`/api/notifications/${id}`, { method: 'PATCH' });
            if (res.ok) {
                setNotifications(prev => prev.map(note => note.id === id ? { ...note, read: true } : note));
            }
        } catch (error) {
            console.error('Ошибка при пометке как прочитанное:', error);
        }
    };

    const deleteNotification = async (id: number) => {
        try {
            const res = await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setNotifications(prev => prev.filter(note => note.id !== id));
                setDeleteModal({ isOpen: false, notificationId: null, notificationTitle: '' });
            }
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    const handleToggle = (id: number) => {
        setExpandedNoteId(prevId => (prevId === id ? null : id));
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C8050E]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Добро пожаловать, {user.name}!
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">
                        Ваш личный кабинет сотрудника РЖД
                    </p>
                </div>

                <Card className="bg-gradient-to-r from-[#C8050E] to-[#A0040B] text-white border-0">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-6 xl:space-x-8">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                            {user.avatar ? (
                                <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <FaUser className="text-3xl sm:text-4xl text-white/70" />
                            )}
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">
                                {user.name} {user.surname} {user.patronymic}
                            </h2>
                            <p className="text-white/90 mb-2 text-sm sm:text-base">{user.post}</p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm">
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <FaEnvelope className="text-white/70" />
                                    <span className="truncate max-w-[200px]">{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <FaPhone className="text-white/70" />
                                    <span>{user.phone}</span>
                                </div>
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <FaMapMarkerAlt className="text-white/70" />
                                    <span>{user.city}</span>
                                </div>
                            </div>
                        </div>
                        <Link href="/lk/profile" className="w-full sm:w-auto">
                            <Button variant="outline" className="bg-red-500 border-white border-2 text-white hover:bg-red-700 w-full sm:w-auto">
                                Редактировать профиль
                            </Button>
                        </Link>
                    </div>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <Card hover className="text-center">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaCalendarAlt className="text-2xl text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Расписание</h3>
                            <p className="text-sm text-gray-600">Сегодня ваша смена</p>
                            <Link href="/lk/schedule">
                                <Button size="sm" className="w-full">Открыть</Button>
                            </Link>
                        </div>
                    </Card>

                    <Card hover className="text-center">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FaTasks className="text-2xl text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Задачи</h3>
                            <p className="text-sm text-gray-600">3 активные задачи</p>
                            <Link href="/lk/tasks">
                                <Button size="sm" className="w-full">Открыть</Button>
                            </Link>
                        </div>
                    </Card>

                    <Card hover className="text-center">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <FaChartLine className="text-2xl text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Отчеты</h3>
                            <p className="text-sm text-gray-600">Создать отчет</p>
                            <Link href="/lk/reports">
                                <Button size="sm" className="w-full">Открыть</Button>
                            </Link>
                        </div>
                    </Card>

                    <Card hover className="text-center">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <FaTrophy className="text-2xl text-yellow-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Достижения</h3>
                            <p className="text-sm text-gray-600">5 новых наград</p>
                            <Button size="sm" className="w-full">Подробнее</Button>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                <FaCloudSun className="mr-2 text-blue-500" />
                                Погода
                            </h3>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-bold text-gray-900">{weather.temp}°C</p>
                                <p className="text-gray-600">{weather.description}</p>
                                <div className="mt-2 space-y-1 text-sm text-gray-500">
                                    <p>Влажность: {weather.humidity}%</p>
                                    <p>Ветер: {weather.windSpeed} м/с</p>
                                </div>
                            </div>
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                                alt={weather.description}
                                className="w-20 h-20"
                            />
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Статистика задач</h3>
                        <div className="h-64 h-full w-full flex justify-center">
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Прогресс по месяцам</h3>
                        <div className="h-64 h-full w-full flex justify-center">
                            <LineChart width={400} height={200} data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="задачи" stroke="#C8050E" strokeWidth={2} />
                                <Line type="monotone" dataKey="смены" stroke="#4ECDC4" strokeWidth={2} />
                            </LineChart>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Достижения</h3>
                        <div className="h-64 h-full w-full flex justify-center">
                            <BarChart width={400} height={200} data={achievementData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="achievements" fill="#C8050E" />
                            </BarChart>
                        </div>
                    </Card>
                </div>

                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            <FaBell className="mr-2 text-[#C8050E]" />
                            Уведомления
                        </h3>
                        <span className="bg-[#C8050E] text-white px-2 py-1 rounded-full text-sm">
                            {notifications.filter(n => !n.read).length} новых
                        </span>
                    </div>
                    
                    {notifications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <FaBell className="text-4xl mx-auto mb-4 opacity-50" />
                            <p>Нет уведомлений</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {notifications.map((note) => (
                                <div
                                    key={note.id}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                        note.read 
                                            ? 'bg-green-50 border-green-200' 
                                            : 'bg-white border-[#C8050E]/30 shadow-md'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-medium text-gray-900">{note.title}</h4>
                                        {!note.read && (
                                            <div className="w-2 h-2 bg-[#C8050E] rounded-full"></div>
                                        )}
                                    </div>
                                    
                                    {expandedNoteId === note.id && (
                                        <p className="text-sm text-gray-600 mb-3">{note.details}</p>
                                    )}
                                    
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => markAsRead(note.id)}
                                                className="bg-blue-200 text-blue-600 hover:text-blue-700"
                                            >
                                                <FaEye className="text-xs" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setDeleteModal({
                                                    isOpen: true,
                                                    notificationId: note.id,
                                                    notificationTitle: note.title
                                                })}
                                                className="bg-red-200 text-red-600 hover:text-red-700"
                                            >
                                                <FaTrash className="text-xs" />
                                            </Button>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleToggle(note.id)}
                                            className="bg-gray-300 text-gray-600 hover:text-gray-800"
                                        >
                                            {expandedNoteId === note.id ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
            
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, notificationId: null, notificationTitle: '' })}
                title="Подтверждение удаления"
                size="sm"
            >
                <p className="text-gray-700 mb-6">
                    Вы уверены, что хотите удалить уведомление "{deleteModal.notificationTitle}"?
                </p>
                <div className="flex justify-end space-x-3">
                    <Button
                        variant="outline"
                        onClick={() => setDeleteModal({ isOpen: false, notificationId: null, notificationTitle: '' })}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => deleteModal.notificationId && deleteNotification(deleteModal.notificationId)}
                    >
                        Удалить
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;
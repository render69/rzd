// app/lk/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './lk.module.css'; 
import Link from 'next/link';

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
  const [user, setUser] = useState<User | null>(null); // Типизируем состояние
  const [notifications, setNotifications] = useState<string[]>(['Обновление графика смен', 'Новое поручение от руководителя', 'Новое поручение от руководителя', 'Новое поручение от руководителя']);
  const [weather, setWeather] = useState<{ temp: string; description: string }>({ temp: '0°C', description: 'Ясно' });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push('/'); // Если пользователь не авторизован, перенаправляем на страницу входа
      }
    };

    fetchUser();

    setWeather({ temp: '5°C', description: 'Облачно' });
  }, [router]);
  

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className={`${styles.container} p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500`}>
      {/* Информация о пользователе */}
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

        {/* Карточки с данными */}
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

          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md p-6 border border-red-500">
            <h2 className="text-xl font-semibold text-red-600">Погода</h2>
            <p className="text-gray-700">{weather.temp} — {weather.description}</p>
          </div>
        </div>

        {/* Уведомления */}
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

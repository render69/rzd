'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface User {
    avatar: string; /// Ссылка на аватар пользователя
    username: string; /// Уникальное имя пользователя для входа
    name: string; /// Имя пользователя
    surname: string;                            /// Фамилия пользователя
    patronymic: string;                            /// Отчество пользователя
    city: string;                          /// Город проживания
    street: string;                       /// Улица
    house: string;                           /// Номер дома
    apartment: string;                           /// Номер квартиры
    experience: number;                                   /// Опыт работы (в годах)
    post: string;                        /// Должность пользователя
    email: string;                  /// Уникальный email пользователя
    phone: string;                           /// Номер телефона пользователя
}

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div className="p-8">Загрузка профиля...</div>;
    }

    return (
        <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            <div className="mt-8 p-8 max-w-4xl mx-auto bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg">
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <Image
                            src={user.avatar}
                            alt="Аватар пользователя"
                            width={120}
                            height={120}
                            className="w-32 h-32 rounded-full object-cover shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                        <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold shadow-md">
                            {user.post}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">
                            {user.surname} {/*Фамилия пользователя*/}
                            {user.name} {/*Имя пользователя*/}
                            {user.patronymic} {/*Отчество пользователя*/}
                        </h1>
                        <p className="text-lg text-gray-600">Стаж: {user.experience} года/лет</p>
                        <p className="text-gray-600">Логин: {user.username}</p>
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-2 p-4 bg-white bg-opacity-70 rounded-xl shadow-lg hover:bg-red-50 transition duration-300 ease-in-out">
                        <FaEnvelope className="text-red-600 text-2xl" />
                        <p className="text-gray-800">
                            <strong>Электронная почта:</strong> {user.email}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 p-4 bg-white bg-opacity-70 rounded-xl shadow-lg hover:bg-red-50 transition duration-300 ease-in-out">
                        <FaPhone className="text-red-600 text-2xl" />
                        <p className="text-gray-800">
                            <strong>Телефон:</strong> {user.phone}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 p-4 bg-white bg-opacity-70 rounded-xl shadow-lg hover:bg-red-50 transition duration-300 ease-in-out">
                        <FaMapMarkerAlt className="text-red-600 text-2xl" />
                        <p className="text-gray-800">
                            <strong>Адрес: </strong>
                            г.{user.city} {/* Город проживания*/}
                            ул.{user.street} {/* Улица*/}
                            д.{user.house} {/* Номер дома*/}
                            кв.{user.apartment} {/* Номер квартиры */}
                        </p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out"
                    >
                        {isEditing ? 'Сохранить изменения' : 'Редактировать'}
                    </button>
                </div>
                {isEditing && (
                    <div className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Электронная почта
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                                Телефон
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={user.phone}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                                Город
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={user.city}
                                onChange={(e) => setUser({ ...user, city: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                                Улица
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={user.street}
                                onChange={(e) => setUser({ ...user, street: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                                Дом
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={user.house}
                                onChange={(e) => setUser({ ...user, house: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                                Квартира
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={user.apartment}
                                onChange={(e) => setUser({ ...user, apartment: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;

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
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                setEditedUser(data);
            }
        };

        fetchUser();
    }, []);

    const handleSaveChanges = () => {
        setShowConfirmation(true);
        // Here you would typically make an API call to save the changes
        // After successful API call:
        // setUser(editedUser);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        setIsEditing(false);
        // Reset edited data to original user data
        setEditedUser(user);
    };

    const handleStartEditing = () => {
        setEditedUser(user);
        setIsEditing(true);
    };

    if (!user || !editedUser) {
        return <div className="p-8">Загрузка профиля...</div>;
    }

    return (
        <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-500 max-w-md">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Ваши данные отправлены на согласование в отдел кадров</h2>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleCloseConfirmation}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                            >
                                ОК
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
                            {user.city} {/* Город проживания*/}
                            {user.street} {/* Улица*/}
                            д.{user.house} {/* Номер дома*/}
                            кв.{user.apartment} {/* Номер квартиры */}
                        </p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={isEditing ? handleSaveChanges : handleStartEditing}
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
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
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
                                value={editedUser.phone}
                                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-lg font-medium text-gray-700">
                                Город
                            </label>
                            <input
                                id="city"
                                type="text"
                                value={editedUser.city}
                                onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="street" className="block text-lg font-medium text-gray-700">
                                Улица
                            </label>
                            <input
                                id="street"
                                type="text"
                                value={editedUser.street}
                                onChange={(e) => setEditedUser({ ...editedUser, street: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="house" className="block text-lg font-medium text-gray-700">
                                Дом
                            </label>
                            <input
                                id="house"
                                type="text"
                                value={editedUser.house}
                                onChange={(e) => setEditedUser({ ...editedUser, house: e.target.value })}
                                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="apartment" className="block text-lg font-medium text-gray-700">
                                Квартира
                            </label>
                            <input
                                id="apartment"
                                type="text"
                                value={editedUser.apartment}
                                onChange={(e) => setEditedUser({ ...editedUser, apartment: e.target.value })}
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

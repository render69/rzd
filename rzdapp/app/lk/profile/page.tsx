'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface User {
    avatar: string;
    name: string;
    position: string;
    experience: string;
    email: string;
    phone: string;
    address: string;
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
                        <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-sm">
                            {user.position}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
                        <p className="text-lg text-gray-600">Стаж: {user.experience} года/лет</p>
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
                            <strong>Адрес:</strong> {user.address}
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
                                Адрес
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
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

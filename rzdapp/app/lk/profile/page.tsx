'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Используем иконки

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
  const [isEditing, setIsEditing] = useState(false); // Состояние редактирования

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
    <div className=" p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
    <div className="mt-8 p-8 max-w-4xl mx-auto bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg">
      {/* Блок с аватаром и основным контентом */}
      <div className="flex items-center space-x-6">
        <Image
          src={user.avatar}
          alt="Аватар пользователя"
          width={120}
          height={120}
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
          <p className="text-lg text-gray-600">{user.position}</p>
          <p className="text-gray-600">Стаж: {user.experience}</p>
        </div>
      </div>

      {/* Блок с контактной информацией */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-gray-600" />
          <p>
            <strong>Электронная почта:</strong> {user.email}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaPhone className="text-gray-600" />
          <p>
            <strong>Телефон:</strong> {user.phone}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <p>
            <strong>Адрес:</strong> {user.address}
          </p>
        </div>
      </div>

      {/* Кнопка редактирования */}
      <div className="mt-6">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
        >
          {isEditing ? 'Сохранить изменения' : 'Редактировать'}
        </button>
      </div>

      {/* Режим редактирования */}
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
              className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
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
              className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
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
              className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
            />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;

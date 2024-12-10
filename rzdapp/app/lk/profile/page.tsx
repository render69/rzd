'use client';

import Image from 'next/image';
import { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Тестовые данные пользователя
  const user = {
    avatar: '/user-avatar.png',
    name: 'Иван Иванов',
    position: 'Машинист',
    experience: '5 лет',
    email: 'ivanov@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'Москва, ул. Примерная, д. 1',
  };

  return (
    <div className="mt-8 p-8 max-w-4xl mx-auto bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <Image
          src={user.avatar}
          alt="Аватар пользователя"
          width={120}
          height={120}
          className="rounded-full shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-700">{user.position}</p>
          <p className="text-gray-600">Стаж: {user.experience}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <p>
          <strong>Электронная почта:</strong> {user.email}
        </p>
        <p>
          <strong>Телефон:</strong> {user.phone}
        </p>
        <p>
          <strong>Адрес:</strong> {user.address}
        </p>
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        {isEditing ? 'Сохранить изменения' : 'Редактировать'}
      </button>
    </div>
  );
};

export default Profile;

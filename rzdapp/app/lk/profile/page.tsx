'use client';

import Image from 'next/image';
import { useState, useEffect} from 'react';
import styles1 from './style/header.module.css';


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
    <div className="mt-8 p-8 max-w-4xl mx-auto bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <Image
          src={user.avatar}
          alt="Аватар пользователя"
          width={120}
          height={120}
          className="w-32 h-32 rounded-full object-cover shadow-md"
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

      {/* <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        {isEditing ? 'Сохранить изменения' : 'Редактировать'}
      </button> */}
    </div>
  );
};

export default Profile;

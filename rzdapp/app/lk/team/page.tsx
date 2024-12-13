"use client"
import React, { useState } from 'react';

const teamData = [
  {
    id: 1,
    name: 'Иван Иванов',
    role: 'Менеджер проекта',
    email: 'ivanov@company.com',
    phone: '+7 123 456-78-90',
    image: '/img/default-avatar.jpg', // Путь к изображению
  },
  {
    id: 2,
    name: 'Мария Петрова',
    role: 'Разработчик',
    email: 'petrova@company.com',
    phone: '+7 987 654-32-10',
    image: '/img/default-avatar.jpg',
  },
  {
    id: 3,
    name: 'Алексей Смирнов',
    role: 'Тестировщик',
    email: 'smirnov@company.com',
    phone: '+7 345 678-90-12',
    image: '/img/default-avatar.jpg',
  },
  {
    id: 4,
    name: 'Елена Кузнецова',
    role: 'Дизайнер',
    email: 'kuznetsova@company.com',
    phone: '+7 567 890-12-34',
    image: '/img/default-avatar.jpg',
  },
];

const TeamPage: React.FC = () => {
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const [editedMember, setEditedMember] = useState<{
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    image: string;
  } | null>(null);

  const openMemberModal = (id: number) => {
    const member = teamData.find((member) => member.id === id);
    if (member) {
      setActiveMember(id);
      setEditedMember({ ...member });
    }
  };

  const closeMemberModal = () => {
    setActiveMember(null);
    setEditedMember(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedMember) {
      setEditedMember((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const saveMember = () => {
    console.log('Данные сотрудника сохранены:', editedMember);
    closeMemberModal();
  };

  return (
    <section className="min-h-screen p-16 m-8 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-4 border-red-500">
      <div className="p-8 bg-white bg-opacity-90 rounded-lg mb-8 text-center border-4 border-red-500">
        <h1 className="text-4xl font-bold text-red-600">Моя команда</h1>
        <p className="text-gray-700 mt-4 text-xl">Информация о текущих членах команды.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamData.map((member) => (
          <div
            key={member.id}
            className="p-8 bg-white bg-opacity-90 rounded-lg shadow-md border-4 border-red-500 cursor-pointer flex flex-col items-center justify-center text-center"
            onClick={() => openMemberModal(member.id)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-red-600 mb-4">{member.name}</h2>
            <p className="text-gray-600 italic mb-4">{member.role}</p>
            <p className="text-gray-700 text-lg">{member.email}</p>
            <p className="text-gray-700 text-lg">{member.phone}</p>
          </div>
        ))}
      </div>

      {activeMember && editedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 max-w-2xl bg-white rounded-lg shadow-lg border-4 border-red-500">
            <h2 className="text-4xl font-bold text-red-600 mb-4">{editedMember.name}</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Имя</label>
              <input
                id="name"
                name="name"
                type="text"
                value={editedMember.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-lg font-semibold text-gray-700">Должность</label>
              <input
                id="role"
                name="role"
                type="text"
                value={editedMember.role}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={editedMember.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-semibold text-gray-700">Телефон</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={editedMember.phone}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
              />
            </div>
            <button
              onClick={closeMemberModal}
              className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamPage;
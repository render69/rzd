"use client";
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
}

const TeamPage: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const [editedMember, setEditedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetch('/api/team')
      .then(res => res.json())
      .then(data => setTeamData(data))
      .catch(err => console.error('Ошибка загрузки команды:', err));
  }, []);

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
      setEditedMember((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const saveMember = () => {
    console.log('Сохранение данных (в будущем — API-запрос):', editedMember);
    closeMemberModal();
  };

  return (
    <section className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
      <div className="p-2 bg-white bg-opacity-90 rounded-lg mb-8 text-center border-2 border-red-500 shadow-xl transform transition-all hover:scale-105">
        <h1 className="text-4xl font-bold text-red-600">Моя команда</h1>
        <p className="text-gray-700 mt-4 text-xl">Информация о текущих членах команды.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamData.map((member) => (
          <div
            key={member.id}
            className="p-8 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-red-500 cursor-pointer flex flex-col items-center justify-center text-center transform transition-all hover:scale-105 hover:shadow-lg"
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
            <FaEdit className="text-red-600 mt-4 cursor-pointer" />
          </div>
        ))}
      </div>

      {activeMember && editedMember && (
        <div className="fixed inset-0 z-50 flex items-top justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white rounded-lg shadow-lg border-2 border-red-500 p-8 max-w-2xl w-full h-1/6 transform transition-all duration-300 ease-in-out">
            <h2 className="text-4xl font-bold text-red-600 mb-4">{editedMember.name}</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Имя</label>
              <input
                id="name"
                name="name"
                type="text"
                value={editedMember.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg border-2 border-red-400 mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full p-3 bg-white rounded-lg border-2 border-red-400 mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full p-3 bg-white rounded-lg border-2 border-red-400 mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full p-3 bg-white rounded-lg border-2 border-red-400 mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              onClick={closeMemberModal}
              className="mb-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transform transition-all hover:scale-105"
            >
              Закрыть
            </button>
            <button
              onClick={saveMember}
              className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transform transition-all hover:scale-105"
            >
              Сохранить
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamPage;

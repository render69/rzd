"use client"
import React, { useState } from 'react';

const newsData = [
  {
    id: 1,
    title: 'Запуск новой системы управления сменами',
    date: '12 февраля 2025',
    content: 'Мы рады сообщить о запуске новой системы управления сменами, которая позволит сотрудникам легко отслеживать свое расписание и задачи.',
    image: '/scrin/4.png',
  },
  {
    id: 2,
    title: 'Обновление профилей пользователей',
    date: '10 февраля 2025',
    content: 'Теперь пользователи могут добавлять аватары, обновлять контактные данные и видеть личную статистику.',
    image: '/scrin/1.png',
  },
  {
    id: 3,
    title: 'Запуск чата поддержки',
    date: '8 февраля 2025',
    content: 'Добавлен новый функционал чата поддержки, который доступен круглосуточно для всех сотрудников.',
    image: '/scrin/3.png',
  },
  {
    id: 4,
    title: 'Запуск нового модуля обучения',
    date: '5 февраля 2025',
    content: 'Добавлен модуль обучения для сотрудников с интерактивными курсами и тестами.',
    image: '/scrin/2.png',
  },
  {
    id: 5,
    title: 'Обновление системы безопасности',
    date: '2 февраля 2025',
    content: 'Улучшена система безопасности для защиты данных пользователей.',
    image: '/scrin/5.jpg',
  },
  {
    id: 6,
    title: 'Праздничное мероприятие',
    date: '1 февраля 2025',
    content: 'Приглашаем всех сотрудников на праздничное мероприятие, которое состоится в главной площядке РЖД.',
    image: '/scrin/949190.jpg',
  }
];

const NewsPage: React.FC = () => {
  const [activeNews, setActiveNews] = useState<number | null>(null);

  const openNewsModal = (id: number) => {
    setActiveNews(id);
  };

  const closeNewsModal = () => {
    setActiveNews(null);
  };

  return (
    <section className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
      <div className="p-8 bg-white bg-opacity-90 rounded-lg mb-8 text-center border-2 border-red-500">
        <h1 className="text-4xl font-bold text-red-600">Новости компании</h1>
        <p className="text-gray-700 mt-4 text-xl">Будьте в курсе последних обновлений и событий.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsData.map((news) => (
          <article
            key={news.id}
            className="p-8 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-red-500 cursor-pointer flex items-center"
            onClick={() => openNewsModal(news.id)}
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-16 h-16 mr-4 rounded-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">{news.title}</h2>
              <p className="text-gray-600 italic mb-4 text-lg">{news.date}</p>
            </div>
          </article>
        ))}
      </div>

      {activeNews && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 max-w-2xl bg-white rounded-lg shadow-lg border-2 border-red-500">
            <h2 className="text-4xl font-bold text-red-600 mb-4">
              {newsData.find((news) => news.id === activeNews)?.title}
            </h2>
            <p className="text-gray-600 italic mb-4 text-lg">
              {newsData.find((news) => news.id === activeNews)?.date}
            </p>
            <img
              src={newsData.find((news) => news.id === activeNews)?.image}
              alt={newsData.find((news) => news.id === activeNews)?.title}
              className="w-full h-full object-cover mb-4 rounded-md"
            />
            <p className="text-gray-700 text-lg leading-relaxed">
              {newsData.find((news) => news.id === activeNews)?.content}
            </p>
            <button
              onClick={closeNewsModal}
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

export default NewsPage;

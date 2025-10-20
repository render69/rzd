'use client';

import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { FaNewspaper, FaCalendarAlt, FaEye } from 'react-icons/fa';

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

    const selectedNews = newsData.find(news => news.id === activeNews);

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaNewspaper className="mr-3 text-[#C8050E]" />
                        Новости компании
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Будьте в курсе последних обновлений и событий</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {newsData.map((news) => (
                        <Card
                            key={news.id}
                            hover
                            className="cursor-pointer"
                            onClick={() => openNewsModal(news.id)}
                        >
                            <div className="space-y-4">
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
                                        {news.title}
                                    </h2>

                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <FaCalendarAlt className="text-gray-400" />
                                        <span>{news.date}</span>
                                    </div>

                                    <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
                                        {news.content}
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <Button variant="ghost" size="sm" className="text-[#C8050E] hover:text-[#A0040B]">
                                        <FaEye className="mr-1" />
                                        Читать далее
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Modal isOpen={!!activeNews} onClose={closeNewsModal} size="lg">
                    {selectedNews && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {selectedNews.title}
                                </h2>

                                <div className="flex items-center space-x-2 text-gray-500">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <span>{selectedNews.date}</span>
                                </div>

                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={selectedNews.image}
                                        alt={selectedNews.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    {selectedNews.content}
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <Button onClick={closeNewsModal}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default NewsPage;
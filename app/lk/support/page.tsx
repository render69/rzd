'use client';

import React from 'react';
import Link from 'next/link';
import { FaHeadset, FaQuestionCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';


interface User {
    name: string;
    email: string;
}

const SupportPage: React.FC = () => {
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
        <section className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
            <div className="p-4 bg-white bg-opacity-90 rounded-lg mb-6 text-center border-2 border-red-500">
                <h1 className="text-4xl font-bold text-red-600">Поддержка и FAQ</h1>
                <p className="text-gray-700 mt-2">Мы здесь, чтобы помочь вам в любое время!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/lk/support/chat">
                    <button className="flex items-center justify-center p-8 bg-red-600 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300">
                        <FaHeadset className="mr-4 text-4xl" /> Чат с поддержкой
                    </button>
                </Link>
                <Link href="/lk/support/faq">
                    <button className="flex items-center justify-center p-8 bg-red-600 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300">
                        <FaQuestionCircle className="mr-4 text-4xl" /> FAQ
                    </button>
                </Link>
            </div>

            <div className="mt-8 p-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-red-500">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Свяжитесь с нами</h2>
                <h3 className="text-1xl text-red-600 mb-4">Сообщение будет отправлено на почту службы поддерджки. Ответ вы получите на {user.email}</h3>
                <form className="space-y-4">
                    <input type="text" placeholder="Тема проблемы" className="w-full p-4 border-2 rounded-lg border-red-500" />
                    <textarea placeholder="Ваше сообщение" rows={4} className="w-full p-4 border-2 rounded-lg border-red-500"></textarea>
                    <button type="submit" className="w-full p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
                        Отправить сообщение
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SupportPage;
'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { FaCommentDots, FaPaperPlane, FaArrowLeft, FaUser, FaRobot } from 'react-icons/fa';
import Link from 'next/link';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'support';
    timestamp: string;
}

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Добрый день! Чем мы можем помочь?',
            sender: 'support',
            timestamp: new Date().toLocaleTimeString()
        }
    ]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: message,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');

        setTimeout(() => {
            const supportResponse: Message = {
                id: messages.length + 2,
                text: 'Спасибо за ваше сообщение! Мы рассмотрим ваш вопрос и ответим в ближайшее время.',
                sender: 'support',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, supportResponse]);
        }, 1000);
    };

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaCommentDots className="mr-3 text-[#C8050E]" />
                        Чат с поддержкой
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Свяжитесь с нами в режиме реального времени</p>
                </div>

                <div className="flex justify-start">
                    <Link href="/lk/support">
                        <Button variant="outline" size="sm" className="flex items-center space-x-2">
                            <FaArrowLeft />
                            <span>Назад к поддержке</span>
                        </Button>
                    </Link>
                </div>

                <Card className="h-[600px] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        msg.sender === 'user'
                                            ? 'bg-[#C8050E] text-white'
                                            : 'bg-gray-100 text-gray-900'
                                    }`}
                                >
                                    <div className="flex items-start space-x-2">
                                        {msg.sender === 'support' && (
                                            <FaRobot className="text-[#C8050E] mt-1 flex-shrink-0" />
                                        )}
                                        {msg.sender === 'user' && (
                                            <FaUser className="text-white mt-1 flex-shrink-0" />
                                        )}
                                        <div>
                                            <p className="text-sm sm:text-base">{msg.text}</p>
                                            <p className={`text-xs mt-1 ${
                                                msg.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                                            }`}>
                                                {msg.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 p-4">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Введите сообщение..."
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                disabled={!message.trim()}
                                className="bg-[#C8050E] hover:bg-[#A0040B] text-white"
                            >
                                <FaPaperPlane />
                            </Button>
                        </form>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">Информация о поддержке</h3>
                        <p className="text-sm text-gray-600">
                            Время работы службы поддержки: Пн-Пт с 9:00 до 18:00 (МСК)
                        </p>
                        <p className="text-sm text-gray-600">
                            Среднее время ответа: 5-10 минут
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ChatPage;
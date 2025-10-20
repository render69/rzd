'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaHeadset, FaQuestionCircle, FaEnvelope, FaPaperPlane, FaUser } from 'react-icons/fa';

interface User {
    name: string;
    email: string;
}

const SupportPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    setUser({
                        name: 'Пользователь',
                        email: 'user@rzd.ru'
                    });
                }
            } catch (error) {
                console.error('Ошибка загрузки пользователя:', error);
                setUser({
                    name: 'Пользователь',
                    email: 'user@rzd.ru'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            console.log('Отправка сообщения:', formData);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
            setFormData({ subject: '', message: '' });
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            alert('Произошла ошибка при отправке сообщения. Попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C8050E]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaHeadset className="mr-3 text-[#C8050E]" />
                        Поддержка и FAQ
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Мы здесь, чтобы помочь вам в любое время!</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Link href="/lk/support/chat" className="block">
                        <Card hover className="text-center">
                            <div className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                                    <FaHeadset className="text-2xl text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Чат с поддержкой</h3>
                                <p className="text-sm text-gray-600">Свяжитесь с нами в режиме реального времени</p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Открыть чат
                                </Button>
                            </div>
                        </Card>
                    </Link>
                    
                    <Link href="/lk/support/faq" className="block">
                        <Card hover className="text-center">
                            <div className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                    <FaQuestionCircle className="text-2xl text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
                                <p className="text-sm text-gray-600">Ответы на часто задаваемые вопросы</p>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Открыть FAQ
                                </Button>
                            </div>
                        </Card>
                    </Link>
                </div>

                <Card>
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Свяжитесь с нами</h2>
                            <p className="text-sm sm:text-base text-gray-600">
                                Сообщение будет отправлено на почту службы поддержки. Ответ вы получите на <span className="font-medium text-[#C8050E]">{user?.email}</span>
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Тема проблемы"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Кратко опишите суть проблемы"
                                required
                            />
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ваше сообщение
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#C8050E]/20 focus:border-[#C8050E] transition-all duration-200"
                                    placeholder="Подробно опишите вашу проблему или вопрос..."
                                    required
                                />
                            </div>
                            
                            <Button
                                type="submit"
                                disabled={isSubmitting || !formData.subject || !formData.message}
                                className="w-full flex items-center justify-center space-x-2 bg-[#C8050E] hover:bg-[#A0040B] text-white"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Отправка...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        <span>Отправить сообщение</span>
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="text-center space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Дополнительные способы связи</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center justify-center space-x-2">
                                <FaEnvelope className="text-[#C8050E]" />
                                <span>support@rzd.ru</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <FaHeadset className="text-[#C8050E]" />
                                <span>+7 (495) 123-45-67</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            Время работы службы поддержки: Пн-Пт с 9:00 до 18:00 (МСК)
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SupportPage;
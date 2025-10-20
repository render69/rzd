'use client';

import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FaQuestionCircle, FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: 'Как изменить пароль?',
        answer: 'Чтобы изменить пароль, перейдите в раздел "Личный кабинет", выберите "Настройки" и нажмите на кнопку "Изменить пароль".',
        category: 'Аккаунт'
    },
    {
        id: 2,
        question: 'Как связаться с поддержкой?',
        answer: 'Вы можете связаться с нашей поддержкой через чат, который доступен в разделе "Чат с поддержкой", или отправить сообщение через форму обратной связи.',
        category: 'Поддержка'
    },
    {
        id: 3,
        question: 'Как добавить отчёт?',
        answer: 'На странице отчётов нажмите на кнопку "Добавить отчёт", заполните необходимые поля и сохраните.',
        category: 'Отчёты'
    },
    {
        id: 4,
        question: 'Где узнать расписание смен?',
        answer: 'Расписание смен доступно в разделе "Расписание" в главном меню.',
        category: 'Расписание'
    },
    {
        id: 5,
        question: 'Где изменить email?',
        answer: 'Email можно изменить в профиле пользователя или через отдел кадров.',
        category: 'Профиль'
    },
    {
        id: 6,
        question: 'Почему у меня нет задач?',
        answer: 'Возможно, вы всё выполнили. Если вы уверены, что задачи должны быть, обратитесь в поддержку.',
        category: 'Задачи'
    },
    {
        id: 7,
        question: 'Почему сайт не работает?',
        answer: 'Чаще всего это происходит из-за истечения сессии в целях безопасности. Перезагрузите страницу или браузер.',
        category: 'Технические проблемы'
    },
    {
        id: 8,
        question: 'Почему "Моя команда" пустая?',
        answer: 'Возможно, вы единственный участник команды. Если это не так, обратитесь в поддержку для выяснения причины.',
        category: 'Команда'
    }
];

const FaqPage = () => {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Все');

    const categories = ['Все', ...Array.from(new Set(faqData.map(item => item.category)))];

    const filteredFaq = selectedCategory === 'Все' 
        ? faqData 
        : faqData.filter(item => item.category === selectedCategory);

    const toggleExpanded = (id: number) => {
        setExpandedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaQuestionCircle className="mr-3 text-[#C8050E]" />
                        Часто задаваемые вопросы
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Найдите ответы на популярные вопросы</p>
                </div>

                <div className="flex justify-start">
                    <Link href="/lk/support">
                        <Button variant="outline" size="sm" className="flex items-center space-x-2">
                            <FaArrowLeft />
                            <span>Назад к поддержке</span>
                        </Button>
                    </Link>
                </div>

                <Card>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Категории</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'primary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className="text-sm"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                <div className="space-y-4">
                    {filteredFaq.map((item) => (
                        <Card key={item.id} hover>
                            <div className="space-y-3">
                                <div 
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleExpanded(item.id)}
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                    <div className="ml-4">
                                        {expandedItems.includes(item.id) ? (
                                            <FaChevronUp className="text-gray-400" />
                                        ) : (
                                            <FaChevronDown className="text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                
                                {expandedItems.includes(item.id) && (
                                    <div className="pt-3 border-t border-gray-200">
                                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredFaq.length === 0 && (
                    <Card className="text-center py-12">
                        <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Вопросы не найдены</h3>
                        <p className="text-gray-500">По выбранной категории вопросов не найдено</p>
                    </Card>
                )}

                <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="text-center space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Не нашли ответ на свой вопрос?</h3>
                        <p className="text-gray-600">
                            Свяжитесь с нашей службой поддержки для получения персональной помощи
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/lk/support/chat">
                                <Button className="bg-[#C8050E] hover:bg-[#A0040B] text-white">
                                    Открыть чат
                                </Button>
                            </Link>
                            <Link href="/lk/support">
                                <Button variant="outline">
                                    Форма обратной связи
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default FaqPage;
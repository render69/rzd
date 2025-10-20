'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FaBook, FaChalkboardTeacher, FaVideo, FaBookOpen, FaClipboardCheck, FaHandsHelping, FaGraduationCap, FaTasks } from 'react-icons/fa';

const LearningPage: React.FC = () => {
    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaGraduationCap className="mr-3 text-[#C8050E]" />
                        Обучение
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Узнайте много нового и станьте лучшим</p>
                </div>

                <Card className="bg-gradient-to-r from-red-50 to-red-100">
                    <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#C8050E] text-center">Курсы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaGraduationCap className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Основные курсы</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Изучайте основные темы и получайте базовые знания по выбранным направлениям.</p>
                            </Card>
                            
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaBook className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Дополнительные материалы</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Получайте доступ к дополнительным материалам для углубленного изучения тем.</p>
                            </Card>
                            
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaTasks className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Практические задания</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Выполняйте практические задания для закрепления изученного материала.</p>
                            </Card>
                            
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaChalkboardTeacher className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Курсы с наставниками</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Проходите курсы с поддержкой наставников для наилучшего результата.</p>
                            </Card>
                        </div>
                        
                        <div className="text-center">
                            <Link href="/lk/learning/courses">
                                <Button className="flex items-center space-x-2 bg-[#C8050E] hover:bg-[#A0040B] text-white">
                                    <FaGraduationCap />
                                    <span>Перейти к курсам</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#C8050E] text-center">Онлайн обучение</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaVideo className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Видеоуроки</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Смотрите видеолекции и уроки от экспертов в удобное для вас время.</p>
                            </Card>
                            
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaBookOpen className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Интерактивные материалы</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Используйте интерактивные учебные материалы для лучшего понимания тем.</p>
                            </Card>
                            
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaClipboardCheck className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Онлайн тесты</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Проходите тесты и получайте мгновенные результаты для проверки своих знаний.</p>
                            </Card>
                            
                            <Card hover className="text-left">
                                <div className="flex items-center mb-4">
                                    <FaHandsHelping className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Поддержка наставников</h3>
                                </div>
                                <p className="text-gray-700 text-sm sm:text-base">Получайте помощь и советы от наставников в режиме реального времени.</p>
                            </Card>
                        </div>
                        
                        <div className="text-center">
                            <Link href="/lk/learning/online">
                                <Button className="flex items-center space-x-2 bg-[#C8050E] hover:bg-[#A0040B] text-white">
                                    <FaChalkboardTeacher />
                                    <span>Перейти к онлайн обучению</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LearningPage;
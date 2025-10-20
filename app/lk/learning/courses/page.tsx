'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FaBook, FaChalkboardTeacher, FaFilePdf, FaVideo, FaClipboardCheck, FaArrowLeft } from 'react-icons/fa';

interface CourseCardProps {
    title: string;
    description: string;
    link: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, link, Icon }) => (
    <Card hover className="text-left">
        <div className="space-y-4">
            <div className="flex items-center">
                <Icon className="text-[#C8050E] text-2xl sm:text-3xl mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">{description}</p>
            <Link href={link}>
                <Button variant="ghost" size="sm" className="text-[#C8050E] hover:text-[#A0040B]">
                    Перейти к курсу
                </Button>
            </Link>
        </div>
    </Card>
);

const CoursesPage: React.FC = () => {
    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaBook className="mr-3 text-[#C8050E]" />
                        Обучающие Курсы
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Изучайте новые навыки и развивайтесь профессионально</p>
                </div>

                <Card className="bg-gradient-to-r from-red-50 to-red-100">
                    <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#C8050E] text-center">Основные курсы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <CourseCard
                                title="Основы железнодорожного транспорта"
                                description="Изучите основы работы железнодорожного транспорта, включая основные виды поездов, локомотивов и инфраструктуры."
                                link="/courses/railway-basics"
                                Icon={FaBook}
                            />
                            <CourseCard
                                title="Безопасность на железной дороге"
                                description="Обучение мерам безопасности для сотрудников железной дороги, включая правильное поведение на рабочем месте."
                                link="/courses/safety-railway"
                                Icon={FaChalkboardTeacher}
                            />
                            <CourseCard
                                title="Документы и регламенты"
                                description="Все необходимые нормативные документы и регламенты, с которыми должен ознакомиться каждый сотрудник."
                                link="/courses/railway-documents"
                                Icon={FaFilePdf}
                            />
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#C8050E] text-center">Дополнительные обучающие материалы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <CourseCard
                                title="Видеоуроки по безопасности"
                                description="Просмотрите видеоматериалы по безопасности, которые помогут вам освоить основные принципы работы на железной дороге."
                                link="/materials/safety-video-lessons"
                                Icon={FaVideo}
                            />
                            <CourseCard
                                title="Регламент работы локомотивов"
                                description="Скачайте PDF-документы, связанные с эксплуатацией локомотивов, включая стандарты и регламенты."
                                link="/materials/locomotive-regulations"
                                Icon={FaFilePdf}
                            />
                            <CourseCard
                                title="Тренировка с наставниками"
                                description="Запишитесь на тренировки с наставниками, которые помогут вам освоить практические аспекты работы на железной дороге."
                                link="/materials/mentor-training"
                                Icon={FaChalkboardTeacher}
                            />
                            <CourseCard
                                title="Онлайн тесты по безопасности"
                                description="Пройдите онлайн тесты по безопасности для проверки своих знаний."
                                link="/materials/online-safety-tests"
                                Icon={FaClipboardCheck}
                            />
                            <CourseCard
                                title="Работа с документами"
                                description="Изучите основы работы с документами и электронными системами, используемыми в железнодорожной отрасли."
                                link="/materials/working-with-documents"
                                Icon={FaBook}
                            />
                            <CourseCard
                                title="Техническое обслуживание локомотивов"
                                description="Изучите основы технического обслуживания локомотивов и диагностики неисправностей."
                                link="/materials/locomotive-maintenance"
                                Icon={FaVideo}
                            />
                        </div>
                    </div>
                </Card>

                <div className="text-center">
                    <Link href="/lk/learning">
                        <Button variant="outline" className="flex items-center space-x-2 bg-red-500 text-white">
                            <FaArrowLeft />
                            <span>Вернуться к обучению</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
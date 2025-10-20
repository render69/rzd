'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FaChalkboardTeacher, FaHeadset, FaLaptop, FaBookOpen, FaVideo, FaClipboardCheck, FaUsers, FaArrowLeft } from 'react-icons/fa';

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
                    Перейти к обучению
                </Button>
            </Link>
        </div>
    </Card>
);

const OnlinePage: React.FC = () => {
    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaChalkboardTeacher className="mr-3 text-[#C8050E]" />
                        Онлайн обучение
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Интерактивное обучение в удобном формате</p>
                </div>

                <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#C8050E] text-center">Основные программы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <CourseCard
                                title="Виртуальные занятия"
                                description="Присоединяйтесь к онлайн-занятиям с экспертами и получайте знания в реальном времени."
                                link="/lk/learning/online/virtual-classes"
                                Icon={FaChalkboardTeacher}
                            />
                            <CourseCard
                                title="Вебинары по безопасности"
                                description="Участвуйте в вебинарах по вопросам безопасности и других актуальных темах для работников железнодорожного транспорта."
                                link="/online-learning/webinars-safety"
                                Icon={FaHeadset}
                            />
                            <CourseCard
                                title="Онлайн тесты"
                                description="Пройдите онлайн тесты для оценки своих знаний по безопасности, работе с документами и другим аспектам."
                                link="/online-learning/online-tests"
                                Icon={FaLaptop}
                            />
                            <CourseCard
                                title="Виртуальная практика"
                                description="Попробуйте виртуальные тренажеры для практики работы на железной дороге."
                                link="/online-learning/virtual-practice"
                                Icon={FaBookOpen}
                            />
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-green-100">
                    <div className="space-y-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#C8050E] text-center">Дополнительные обучающие материалы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <CourseCard
                                title="Видеоуроки по безопасности"
                                description="Просмотрите видеоматериалы по безопасности, которые помогут вам освоить основные принципы работы на железной дороге."
                                link="/online-learning/safety-video-lessons"
                                Icon={FaVideo}
                            />
                            <CourseCard
                                title="Обучение с наставниками"
                                description="Запишитесь на онлайн тренировки с наставниками для получения практических знаний."
                                link="/online-learning/mentor-training"
                                Icon={FaChalkboardTeacher}
                            />
                            <CourseCard
                                title="Обучение работе с оборудованием"
                                description="Изучите работу с железнодорожным оборудованием, включая локомотивы и вагоны."
                                link="/online-learning/equipment-training"
                                Icon={FaLaptop}
                            />
                            <CourseCard
                                title="Регламент работы локомотивов"
                                description="Скачайте документы и инструкции по эксплуатации локомотивов."
                                link="/online-learning/locomotive-regulations"
                                Icon={FaBookOpen}
                            />
                            <CourseCard
                                title="Онлайн консультации"
                                description="Получите ответы на вопросы по безопасности и работе на железной дороге от опытных специалистов."
                                link="/online-learning/online-consultations"
                                Icon={FaHeadset}
                            />
                            <CourseCard
                                title="Виртуальная тренировка"
                                description="Пройдите виртуальные тренировки по безопасной работе на железной дороге."
                                link="/online-learning/virtual-training"
                                Icon={FaUsers}
                            />
                            <CourseCard
                                title="Тренировки по маневровой работе"
                                description="Изучите основы маневровой работы на железной дороге, включая управление составами."
                                link="/online-learning/shunting-training"
                                Icon={FaChalkboardTeacher}
                            />
                            <CourseCard
                                title="Симулятор локомотивов"
                                description="Попробуйте работать с симулятором локомотива для практики навыков управления."
                                link="/online-learning/locomotive-simulator"
                                Icon={FaLaptop}
                            />
                            <CourseCard
                                title="Онлайн контроль знаний"
                                description="Пройдите онлайн контроль знаний по основным аспектам работы на железной дороге."
                                link="/online-learning/knowledge-control"
                                Icon={FaClipboardCheck}
                            />
                        </div>
                    </div>
                </Card>

                <div className="text-center">
                    <Link href="/lk/learning">
                        <Button variant="outline" className="flex items-center space-x-2">
                            <FaArrowLeft />
                            <span>Вернуться к обучению</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OnlinePage;
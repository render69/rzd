import React from 'react';
import Link from 'next/link';
import { FaBook, FaChalkboardTeacher, FaFilePdf, FaVideo, FaClipboardCheck } from 'react-icons/fa';

interface CourseCardProps {
    title: string;
    description: string;
    link: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Тип для иконки
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, link, Icon }) => (
    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
        <div className="flex items-center mb-4">
            <Icon className="text-red-500 text-3xl mr-3" />
            <h3 className="text-xl font-semibold text-red-600">{title}</h3>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <Link href={link}>
            <p className="text-red-500 hover:underline">Перейти к курсу</p>
        </Link>
    </div>
);

const CoursesPage: React.FC = () => {
    return (
        <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-8 text-center">Обучающие Курсы</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
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

            <div className="bg-gradient-to-r from-red-50 via-white to-red-100 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border-2 border-red-500 mt-5">
                <h3 className="text-xl font-semibold text-red-600 mb-6">Дополнительные обучающие материалы</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center mt-10">
                <Link href="/lk/learning">
                    <button className="p-3 bg-red-600 text-white text-md font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 w-auto">
                        Вернуться назад
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CoursesPage;

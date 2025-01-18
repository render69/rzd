import React from 'react';
import Link from 'next/link';
import { FaChalkboardTeacher, FaHeadset, FaLaptop, FaBookOpen, FaVideo, FaClipboardCheck, FaUsers } from 'react-icons/fa';

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
            <p className="text-red-500 hover:underline">Перейти к обучению</p>
        </Link>
    </div>
);

const OnlinePage: React.FC = () => {
    return (
        <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-8 text-center">Онлайн обучение</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <CourseCard
                title="Виртуальные занятия"
                description="Присоединяйтесь к онлайн-занятиям с экспертами и получайте знания в реальном времени."
                link="/online-learning/virtual-classes"
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

        <div className="bg-gradient-to-r from-red-50 via-white to-red-100 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border-2 border-red-500 mt-5">
            <h3 className="text-xl font-semibold text-red-600 mb-6">Дополнительные обучающие материалы</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

export default OnlinePage;

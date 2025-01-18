import React from 'react';
import Link from 'next/link';
import { FaBook, FaChalkboardTeacher, FaVideo, FaBookOpen, FaClipboardCheck, FaHandsHelping, FaGraduationCap, FaTasks } from 'react-icons/fa';

const LearningPage: React.FC = () => {
    return (
        <div className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500 text-center">
            <div className="p-4 bg-white bg-opacity-90 rounded-lg mb-6 text-center border-2 border-red-500">
                <h1 className="text-4xl font-bold text-red-600">Обучение</h1>
                <p className="text-gray-700 mt-2">Узнайте много нового и станьте лучшим</p>
            </div>

            <div className="bg-gradient-to-r from-red-50 via-white to-red-100 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border-2 border-red-500 mt-5">
                <h2 className="text-2xl font-bold text-red-600 mb-8 text-center">Курсы</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaGraduationCap className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Основные курсы</h3>
                        </div>
                        <p className="text-gray-700">Изучайте основные темы и получайте базовые знания по выбранным направлениям.</p>
                    </div>
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaBook className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Дополнительные материалы</h3>
                        </div>
                        <p className="text-gray-700">Получайте доступ к дополнительным материалам для углубленного изучения тем.</p>
                    </div>
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaTasks className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Практические задания</h3>
                        </div>
                        <p className="text-gray-700">Выполняйте практические задания для закрепления изученного материала.</p>
                    </div>
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaChalkboardTeacher className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Курсы с наставниками</h3>
                        </div>
                        <p className="text-gray-700">Проходите курсы с поддержкой наставников для наилучшего результата.</p>
                    </div>
                </div>
                <nav className="m-8 flex items-center justify-center">
                    <ul className="flex space-x-6">
                        <li className="flex items-center space-x-2">
                            <Link href="/lk/learning/courses">
                                <button className="flex items-center justify-center p-8 bg-red-600 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300">
                                    <FaGraduationCap className="mr-4 text-4xl" />
                                    Перейти к курсам
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="text-center mt-10">
                    <Link href="/lk/learning">
                        <p className="text-red-500 text-lg hover:underline">Вернуться назад</p>
                    </Link>
                </div>
            </div>

            <div className="bg-gradient-to-r from-white via-red-50 to-red-100 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border-2 border-red-500 mt-5">
                <h2 className="text-2xl font-bold text-red-600 mb-8 text-center">Онлайн обучение</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaVideo className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Видеоуроки</h3>
                        </div>
                        <p className="text-gray-700">Смотрите видеолекции и уроки от экспертов в удобное для вас время.</p>
                    </div>
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaBookOpen className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Интерактивные материалы</h3>
                        </div>
                        <p className="text-gray-700">Используйте интерактивные учебные материалы для лучшего понимания тем.</p>
                    </div>
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaClipboardCheck className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Онлайн тесты</h3>
                        </div>
                        <p className="text-gray-700">Проходите тесты и получайте мгновенные результаты для проверки своих знаний.</p>
                    </div>
                    <div className="text-left bg-white bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-red-500">
                        <div className="flex items-center mb-4">
                            <FaHandsHelping className="text-red-500 text-3xl mr-3" />
                            <h3 className="text-xl font-semibold text-red-600">Поддержка наставников</h3>
                        </div>
                        <p className="text-gray-700">Получайте помощь и советы от наставников в режиме реального времени.</p>
                    </div>
                </div>
                <nav className="m-8 flex items-center justify-center ">
                    <ul className="flex space-x-6">
                        <li className="flex items-center space-x-2 ">
                            <Link href="/lk/learning/online" className="text-red-500 hover:text-red-700 transition-colors duration-200">
                                <button className="flex items-center justify-center p-8 bg-red-600 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300">
                                    <FaChalkboardTeacher className=" mr-4 text-4xl" />
                                    Перейти к онлайн обучению
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="text-center mt-10">
                    <Link href="/lk/learning">
                        <p className="text-red-500 text-lg hover:underline">Вернуться назад</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default LearningPage;
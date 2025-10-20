'use client';

import Image from "next/image";
import { useState } from 'react';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Card from './components/ui/Card';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                window.location.href = '/lk';
            } else {
                const data = await res.json();
                setError(data.message || 'Ошибка авторизации');
            }
        } catch (err) {
            setError('Ошибка соединения с сервером');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-6xl">
                <div className="flex flex-col lg:flex-row rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden bg-white">
                    <div className="lg:w-1/2 relative h-48 sm:h-64 lg:h-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C8050E] to-[#A0040B]" />
                        <Image
                            src="/lk.jpg"
                            alt="Логотип РЖД"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 sm:p-6 lg:p-8">
                            <div className="text-center">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">РЖД</h1>
                                <p className="text-lg sm:text-xl opacity-90 mb-1 sm:mb-2">Личный кабинет сотрудника</p>
                                <p className="text-xs sm:text-sm opacity-75">
                                    Управление задачами, расписанием и профессиональным развитием
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
                        <div className="max-w-md mx-auto w-full">
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                    Добро пожаловать
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Войдите в свой личный кабинет
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <Input
                                    label="Логин"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Введите ваш логин"
                                    icon={<FaUser />}
                                    required
                                />

                                <div className="relative">
                                    <Input
                                        label="Пароль"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Введите ваш пароль"
                                        icon={<FaLock />}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    isLoading={isLoading}
                                    disabled={!username || !password}
                                >
                                    {isLoading ? 'Вход...' : 'Войти в систему'}
                                </Button>

                                <div className="text-center">
                                    <a
                                        href="/forgot-password"
                                        className="text-[#C8050E] hover:text-[#A0040B] text-sm font-medium transition-colors"
                                    >
                                        Забыли пароль?
                                    </a>
                                </div>
                            </form>

                            <div className="mt-8 text-center text-sm text-gray-500">
                                <p className="mb-2">Тестовые данные для входа:</p>
                                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                                    <p className="font-mono text-xs">
                                        Логин: <span className="font-bold">admin</span>
                                    </p>
                                    <p className="font-mono text-xs">
                                        Пароль: <span className="font-bold">admin123</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
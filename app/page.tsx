'use client';

import styles from "./style/Home.module.css";
import rzdlipmain from "../public/lk.jpg";
import Image from "next/image";
import { useState } from 'react';

const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            console.log('Успешный вход');
            window.location.href = '/lk';
        } else {
            const data = await res.json();
            console.error('Ошибка: ', data.message);
            alert('Ошибка авторизации: ' + data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg">
            <div className="flex w-full max-w-6xl h-[400px] shadow-2xl rounded-lg overflow-hidden border-2 border-[#C8050E] bg-white">

                {/* Левая секция с логотипом */}
                <div className="w-1/2 h-full hidden lg:flex">
                    <div className="w-full h-full relative">
                        <Image
                            src={rzdlipmain}
                            alt="Логотип РЖД"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Правая секция с формой */}
                <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center bg-[#dbdbdb] shadow-lg">
                    <h1 className="text-[#C8050E] mb-6 text-center text-2xl font-bold">
                        Вход в личный кабинет РЖД
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm text-[#555] font-bold">
                                Логин
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-[#C8050E] rounded-md text-base bg-[#f8f8f8] focus:outline-none focus:border-red-600 focus:shadow-[0_0_5px_rgba(200,5,14,0.5)] transition-all"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm text-[#555] font-bold">
                                Пароль
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-[#C8050E] rounded-md text-base bg-[#f8f8f8] focus:outline-none focus:border-red-600 focus:shadow-[0_0_5px_rgba(200,5,14,0.5)] transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#C8050E] text-white font-bold rounded-md hover:bg-red-700 transition"
                        >
                            Войти
                        </button>

                        <a
                            href="/forgot-password"
                            className="block mt-4 text-center text-sm text-[#C8050E] hover:underline"
                        >
                            Забыли пароль?
                        </a>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Page;
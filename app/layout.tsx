'use client';

// import type { Metadata } from "next";
import localFont from "next/font/local";
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles1 from './style/header.module.css';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import {FaUserCircle} from 'react-icons/fa'
import Image from "next/image";
import logo from '../public/logorzd.png';
import "./globals.css";
interface User {
    id: number;
    username: string;
    position: string;
    avatar: string;
    name: string;
    experience: string;
    email: string;
    phone: string;
    address: string;
}
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    // Определяем, нужно ли скрывать Header и Footer
    const hideHeaderFooter = pathname === '/';
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                router.push('/'); // Если пользователь не авторизован, перенаправляем на страницу входа
            }
        };

        fetchUser();

    }, [router]);
    const navigate = [
        { id: 1, name: "Главная", className: styles1.mainGl, link: '/lk', dataHover: "Главная" },
        { id: 2, name: "Расписание", className: styles1.mainGl, link: '/lk/schedule', dataHover: "Расписание" },
        { id: 3, name: "Задачи", className: styles1.mainGl, link: '/lk/tasks', dataHover: "Задачи" },
        { id: 4, name: "Отчеты", className: styles1.mainGl, link: '/lk/reports', dataHover: "Отчеты" },
        { id: 5, name: "Моя команда", className: styles1.mainGl, link: '/lk/team', dataHover: "Моя команда" },
        { id: 6, name: "Поддержка", className: styles1.mainGl, link: '/lk/support', dataHover: "Поддержка" },
        { id: 7, name: "Новости", className: styles1.mainGl, link: '/lk/news', dataHover: "Новости" },
        { id: 8, name: "Обучение", className: styles1.mainGl, link: '/lk/learning', dataHover: "Обучение" },
    ];
    return (
        <html lang="ru">
            <body>
                <div className={styles1.container123}>
                    {!hideHeaderFooter &&
                        <header className={styles1.header}>
                            <Image src={logo} alt="Logo" className="w-16 m-4"/>
                            <nav className={styles1.nav}>
                                <ul className={styles1.ulhead}>
                                    {navigate.map(({ id, name, link, dataHover }) => (
                                        <li key={id} className="lihead">
                                            <a href={link} data-hover={dataHover} className="litxt">
                                                {name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className={styles1.leftPatel}>
                                <Link href="/lk/profile">
                                    <FaUserCircle className="text-red-600 text-5xl mr-5"/>
                                </Link>
                            </div>
                        </header>
                    }
                    <div className={styles1.mainchildren}>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;

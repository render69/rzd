'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from './components/Header';
import "./globals.css";

interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    patronymic: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    experience: number;
    post: string;
    email: string;
    phone: string;
    avatar: string;
    teamId?: number;
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const hideHeader = pathname === '/';

    useEffect(() => {
        const fetchUser = async () => {
            if (hideHeader) return;
            
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Ошибка загрузки пользователя:', error);
                router.push('/');
            }
        };

        fetchUser();
    }, [router, hideHeader]);

    return (
        <html lang="ru">
            <body className="min-h-screen bg-gray-50">
                <div className="min-h-screen flex flex-col">
                    {!hideHeader && <Header user={user} />}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Button from './ui/Button';
import logo from '../../public/logorzd.png';

interface HeaderProps {
    user: {
        name: string;
        avatar?: string;
    } | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigation = [
        { id: 1, name: "Главная", link: '/lk', icon: "🏠" },
        { id: 2, name: "Расписание", link: '/lk/schedule', icon: "📅" },
        { id: 3, name: "Задачи", link: '/lk/tasks', icon: "✅" },
        { id: 4, name: "Отчеты", link: '/lk/reports', icon: "📊" },
        { id: 5, name: "Команда", link: '/lk/team', icon: "👥" },
        { id: 6, name: "Поддержка", link: '/lk/support', icon: "🆘" },
        { id: 7, name: "Новости", link: '/lk/news', icon: "📰" },
        { id: 8, name: "Обучение", link: '/lk/learning', icon: "🎓" },
    ];

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/');
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center justify-center w-10 h-10">
                            <Image
                                src={logo}
                                alt="РЖД"
                                width={40}
                                height={40}
                                className="object-contain w-10 h-10"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold text-gray-900 leading-none select-none">
                            РЖД
                        </span>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-1 ml-6">
                        {navigation.map(({ id, name, link, icon }) => (
                            <Link
                                key={id}
                                href={link}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${pathname === link
                                        ? "bg-[#C8050E] text-white shadow-sm"
                                        : "text-gray-700 hover:text-[#C8050E] hover:bg-red-50"
                                    }`}
                            >
                                <span className="text-base">{icon}</span>
                                <span>{name}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                        <Link
                            href="/lk/profile"
                            className="flex items-center gap-2 text-gray-700 hover:text-[#C8050E] transition-colors"
                        >
                            <FaUserCircle className="text-2xl" />
                            <span className="hidden sm:block text-sm font-medium truncate max-w-[130px] leading-none">
                                {user?.name}
                            </span>
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-[#C8050E]"
                        >
                            <FaSignOutAlt />
                            <span>Выйти</span>
                        </Button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-[#C8050E] hover:bg-red-50 transition-colors"
                            aria-label="Меню"
                        >
                            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 bg-white">
                    <nav className="flex flex-col py-3 space-y-1">
                        {navigation.map(({ id, name, link, icon }) => (
                            <Link
                                key={id}
                                href={link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center px-5 py-3 rounded-md text-sm font-medium transition-colors
              ${pathname === link
                                        ? "bg-[#C8050E] text-white"
                                        : "text-gray-700 hover:text-[#C8050E] hover:bg-red-50"
                                    }`}
                            >
                                <span className="mr-3 text-lg">{icon}</span>
                                <span>{name}</span>
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center w-full px-5 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <FaSignOutAlt className="mr-3" />
                            <span>Выйти</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;

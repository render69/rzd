'use client';

// import type { Metadata } from "next";
import localFont from "next/font/local";
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import logo from './lk.jpg'
import img1 from './lk.jpg'
import styles1 from './style/header.module.css';
import { useContext } from 'react';

import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Определяем, нужно ли скрывать Header и Footer
  const hideHeaderFooter = pathname === '/';
  const [isChecked, setIsChecked] = useState(false);

  const navigate = [
    { id: 1, name: "Главная", className: styles1.mainGl, link: '/lk', dataHover: "Главная" },
    { id: 2, name: "Расписание", className: styles1.mainGl, link: '/lk/schedule', dataHover: "Расписание" },
    { id: 3, name: "Задачи", className: styles1.mainGl, link: '/lk/tasks', dataHover: "Задачи" },
    { id: 4, name: "Отчеты", className: styles1.mainGl, link: '/lk/reports', dataHover: "Отчеты" },
    { id: 5, name: "Моя команда", className: styles1.mainGl, link: '/lk/team', dataHover: "Моя команда" },
    { id: 6, name: "Поддержка", className: styles1.mainGl, link: '/lk/support', dataHover: "Поддержка" },
    { id: 7, name: "Новости", className: styles1.mainGl, link: '/lk/news', dataHover: "Новости" },
  ];

  return (
  
    <html lang="ru">
      <body>
        <div className={styles1.container123}>
          {!hideHeaderFooter && 
            <header className={styles1.header}>
              <div className={styles1.logo}>
                <Image src={logo} alt="Logo" className={styles1.logoimg} width={1280} height={720} priority />
              </div>

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
                        <Image 
                        src={img1} 
                        alt="avatar" 
                        className={styles1.userImg} 
                        priority 
                        />
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

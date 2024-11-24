'use client'; 

import styles from "./style/Home.module.css";
import rzdlipmain from "./lk.jpg";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Убедись, что используешь из next/navigation

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
      // Если вход успешен, перенаправляем на другую страницу
      console.log('Успешный вход');
      window.location.href = '/dashboard'; // Редирект на страницу панели управления
    } else {
      const data = await res.json();
      console.error('Ошибка: ', data.message);  // Вывод ошибки с сервера
      alert('Ошибка авторизации: ' + data.message); // Покажите пользователю сообщение об ошибке
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image src={rzdlipmain} className={styles.imagess} alt="Логотип РЖД" />
      </div>
      <div className={styles.formSection}>
        <h1>Вход в личный кабинет РЖД</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Войти</button>
          <a href="/forgot-password" className={styles.forgotLink}>
            Забыли пароль?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Page;  // Экспортируем LoginPage, а не Page

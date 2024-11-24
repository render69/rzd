"use client";

import styles from "./style/Home.module.css";
import rzdlipmain from "./lk.jpg";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid credentials');
    } else if (result?.ok) {
      router.push('/lk'); // Переадресация в личный кабинет
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
            <input type="email" id="username" name="username" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" name="password" required />
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

"use client";

import styles from "./style/Home.module.css";
import rzdlipmain from "./rzdlip.jpg";
import Image from 'next/image'


export default function Home() {
  return (
    <div className={styles.container}>
    <div className={styles.imageSection}>
      <Image src={rzdlipmain} alt="Логотип РЖД" />
    </div>
    <div className={styles.formSection}>
      <h1>Вход в личный кабинет РЖД</h1>
      <form action="/login" method="POST">
        <div className={styles.inputGroup}>
          <label htmlFor="username">Логин</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Войти</button>
        <a href="/forgot-password" className={styles.forgotLink}>Забыли пароль?</a>
      </form>
    </div>
  </div>
  );
}

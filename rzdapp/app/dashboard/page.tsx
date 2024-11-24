// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null); // Типизируем состояние
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

  if (!user) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Добро пожаловать, {user.username}</h1>
      {/* Здесь можно вывести дополнительную информацию для ЛК */}
    </div>
  );
};

export default Dashboard;

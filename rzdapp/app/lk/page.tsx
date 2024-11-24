import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function LkPage() {
  const session = await getSession();

  if (!session) {
    redirect('/'); // Перенаправление на главную страницу, если пользователь не авторизован
  }

  return (
    <div>
      <h1>Welcome, {session.user?.email}</h1>
      <p>This is your personal dashboard.</p>
    </div>
  );
}

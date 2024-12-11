"use client"
import React from 'react';

interface Task {
  id: number;
  title: string;
  deadline: string;
  status: 'В процессе' | 'Ожидает' | 'Завершено';
}

const TasksPage = () => {
  const tasks: Task[] = [
    { id: 1, title: 'Проверка вагонов', deadline: '2024-12-02', status: 'В процессе' },
    { id: 2, title: 'Отчёт о безопасности', deadline: '2024-12-04', status: 'Ожидает' },
    { id: 3, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает' },
    { id: 4, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает' },
    { id: 5, title: 'Проверка', deadline: '2024-12-05', status: 'В процессе' },
    { id: 6, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает' },
    { id: 7, title: 'Проверка оборудования 6', deadline: '2024-12-05', status: 'Завершено' },
    { id: 8, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Завершено' },
    { id: 9, title: 'Проверка оборудования 2', deadline: '2024-12-05', status: 'Завершено' },
  ];

  const getStatusClass = (status: Task['status']) => {
    switch (status) {
      case 'В процессе':
        return 'bg-green-100';
      case 'Ожидает':
        return 'bg-yellow-100';
      case 'Завершено':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <section className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
      <div className="p-1 bg-white bg-opacity-90 rounded-lg mb-1 text-center border-2 border-red-500">
        <h1 className="text-3xl font-semibold text-red-500">Задачи и поручения</h1>
      </div>
      <div className="grid gap-4 p-4 bg-white rounded-lg shadow border border-red-500 m-4">
        {[
          { title: 'Текущие задачи', tasks: tasks.filter(task => task.status === 'В процессе') },
          { title: 'Ожидающие задачи', tasks: tasks.filter(task => task.status === 'Ожидает') },
          { title: 'Завершённые задачи', tasks: tasks.filter(task => task.status === 'Завершено') },
        ].map((section) => (
          <div key={section.title} className="mb-6">
            <div className="p-1 bg-white rounded-lg mb-1 text-center border-2 border-red-500">
              <h2 className="text-2xl font-semibold text-red-500">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow border border-red-500">
              {section.tasks.map(task => (
                <div
                  key={task.id}
                  className={`mb-1 p-4 ${getStatusClass(task.status)} rounded-lg shadow border border-red-500`}
                >
                  <p>Задача: {task.title}</p>
                  <p>Дедлайн: {task.deadline}</p>
                  <p>Статус: {task.status}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TasksPage;

"use client";
import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  deadline: string;
  status: 'В процессе' | 'Ожидает' | 'Завершено';
  description: string;
}

const TasksPage = () => {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const tasks: Task[] = [
    { id: 1, title: 'Проверка вагонов', deadline: '2024-12-02', status: 'В процессе', description: 'Провести проверку всех вагонов в депо и обеспечить их готовность.' },
    { id: 2, title: 'Отчёт о безопасности', deadline: '2024-12-04', status: 'В процессе', description: 'Подготовить отчёт о соблюдении норм безопасности на предприятии.' },
    { id: 3, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает', description: 'Проверить техническое состояние оборудования на складе.' },
    { id: 4, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает', description: 'Проверить исправность приборов на производстве.' },
    { id: 5, title: 'Проверка', deadline: '2024-12-05', status: 'В процессе', description: 'Проверить рабочие параметры станков на предприятии.' },
    { id: 6, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Ожидает', description: 'Провести плановую проверку всех оборудования.' },
    { id: 7, title: 'Проверка оборудования 6', deadline: '2024-12-05', status: 'Завершено', description: 'Заключительный этап проверки оборудования на исправность.' },
    { id: 8, title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Завершено', description: 'Проверить оборудование на производственном участке.' },
    { id: 9, title: 'Проверка оборудования 2', deadline: '2024-12-05', status: 'Завершено', description: 'Проверка функциональности всего оборудования.' },
  ];

  const getStatusClass = (status: Task['status']) => {
    switch (status) {
      case 'В процессе':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ожидает':
        return 'bg-red-100 text-red-800';
      case 'Завершено':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100';
    }
  };

  const toggleDescription = (id: number) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  return (
    <section className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
      <div className="p-1 bg-white bg-opacity-90 rounded-lg text-center border-2 border-red-500">
        <h1 className="text-3xl font-semibold text-red-500">Задачи и поручения</h1>
      </div>
      <div className="grid gap-4 p-4 bg-white rounded-lg shadow border-2 border-red-500 m-4">
        {[
          { title: 'Текущие задачи', tasks: tasks.filter(task => task.status === 'В процессе') },
          { title: 'Ожидающие задачи', tasks: tasks.filter(task => task.status === 'Ожидает') },
          { title: 'Завершённые задачи', tasks: tasks.filter(task => task.status === 'Завершено') },
        ].map((section) => (
          <div key={section.title}>
            <div className="p-1 bg-white rounded-lg text-center border-2 border-red-500">
              <h2 className="text-2xl font-semibold text-red-500">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
              {section.tasks.map(task => (
                <div
                  key={task.id}
                  className={`p-4 ${getStatusClass(task.status)} rounded-lg shadow border-2 border-red-500 cursor-pointer`}
                  onClick={() => toggleDescription(task.id)}
                >
                  <p className="font-medium">Задача: {task.title}</p>
                  <p>Дедлайн: {task.deadline}</p>
                  <p>Статус: {task.status}</p>
                  {expandedTaskId === task.id && (
                    <div className="mt-2 text-gray-700">
                      <p><strong>Описание:</strong> {task.description}</p>
                    </div>
                  )}
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

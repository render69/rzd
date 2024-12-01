import React from 'react';

const TasksPage: React.FC = () => {
  const tasks = [
    { title: 'Проверка вагонов', deadline: '2024-12-02', status: 'В процессе' },
    { title: 'Отчёт о безопасности', deadline: '2024-12-04', status: 'Ожидает' },
    { title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Завершено' },
  ];

  return (
    <section>
    <h1>Задачи и поручения</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>Дедлайн: {task.deadline}</p>
            <p>Статус: {task.status}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TasksPage;

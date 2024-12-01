import React from 'react';

const SchedulePage: React.FC = () => {
  // Временно добавляем статические данные
  const schedule = [
    { date: '2024-12-01', shift: 'Дневная', status: 'Выполняется' },
    { date: '2024-12-02', shift: 'Ночная', status: 'Запланировано' },
    { date: '2024-12-03', shift: 'Выходной', status: 'Свободен' },
  ];

  return (
    <section>
    <h1>Расписание смен</h1>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Смена</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.shift}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SchedulePage;

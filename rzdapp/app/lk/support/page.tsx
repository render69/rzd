import React from 'react';

const SupportPage: React.FC = () => {
  const tasks = [
    { title: 'Проверка вагонов', deadline: '2024-12-02', status: 'В процессе' },
    { title: 'Отчёт о безопасности', deadline: '2024-12-04', status: 'Ожидает' },
    { title: 'Проверка оборудования', deadline: '2024-12-05', status: 'Завершено' },
  ];

  return (
    <section className=' p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500'>
        <div className="p-1 bg-white bg-opacity-90 rounded-lg mb-1 text-center border-2 border-red-500">
            <h1 className="text-3xl font-semibold text-red-500">Поддержка и FAQ</h1>
        </div>
        <div>
            <div className="p-1 bg-white bg-opacity-90 rounded-lg mb-1 text-center border border-red-500">
                <h2 className="text-2xl font-semibold text-red-500">Выберите что вам необходимо</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 pb-4'>
                <button className='mb-10 p-10 bg-red-500 text-white text-3xl'>Чат с поддержкой</button>
                <button className='mb-10 p-10 bg-red-500 text-white text-3xl'>FAQ</button>
            </div>
        </div>
    </section>
  );
};

export default SupportPage;

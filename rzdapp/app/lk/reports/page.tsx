"use client"
import React, { useState } from 'react';

const reportsData = [
  {
    id: 1,
    title: 'Ежемесячный отчёт за ноябрь 2024',
    date: '1 декабря 2024',
    summary: 'Отчёт по производительности команды за ноябрь, включая достижения, ошибки и планы на следующий месяц.'
  },
  {
    id: 2,
    title: 'Отчёт по обучению сотрудников',
    date: '28 ноября 2024',
    summary: 'Сводка по завершённым курсам и тестам, а также статистика по новым обучающим материалам.'
  },
  {
    id: 3,
    title: 'Ежеквартальный финансовый отчёт',
    date: '15 ноября 2024',
    summary: 'Детализированный финансовый отчёт с ключевыми показателями прибыли и расходов за последний квартал.'
  },
  {
    id: 4,
    title: 'Отчёт по безопасности',
    date: '5 ноября 2024',
    summary: 'Отчёт о происшествиях и мерах, принятых для повышения безопасности на рабочем месте.'
  }
];

const ReportsPage: React.FC = () => {
  const [activeReport, setActiveReport] = useState<number | null>(null);
  const [editedReport, setEditedReport] = useState<{ id: number; title: string; summary: string } | null>(null);

  const openReportModal = (id: number) => {
    const report = reportsData.find((report) => report.id === id);
    if (report) {
      setActiveReport(id);
      setEditedReport({ id: report.id, title: report.title, summary: report.summary });
    }
  };

  const closeReportModal = () => {
    setActiveReport(null);
    setEditedReport(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedReport) {
      setEditedReport((prevState) => ({
        ...prevState!,
        [name]: value
      }));
    }
  };

  const saveReport = () => {
    // Здесь можно добавить логику для сохранения изменений
    console.log('Отчёт сохранён:', editedReport);
    closeReportModal();
  };

  return (
    <section className="min-h-screen p-16 m-8 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-4 border-red-500">
      <div className="p-8 bg-white bg-opacity-90 rounded-lg mb-8 text-center border-4 border-red-500">
        <h1 className="text-4xl font-bold text-red-600">Отчёты</h1>
        <p className="text-gray-700 mt-4 text-xl">Сводка последних отчётов и аналитики.</p><br></br>
        <div className='grid md:grid-cols-2 gap-4'>
          <button
              onClick={saveReport}
              className="mb-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Добавить отчёт
            </button>
            <button
              onClick={closeReportModal}
              className="mb-5 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Удалить отчёт
            </button>
          </div>
      </div>

      <div className="grid gap-2 m-8">
        {reportsData.map((report) => (
          <article
            key={report.id}
            className="p-8 bg-white bg-opacity-90 rounded-lg shadow-md border-4 border-red-500 cursor-pointer"
            onClick={() => openReportModal(report.id)}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">{report.title}</h2>
            <p className="text-gray-600 italic mb-4 text-lg">{report.date}</p>
            <p className="text-gray-700 line-clamp-3">{report.summary}</p>
          </article>
        ))}
      </div>

      {activeReport && editedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 max-w-2xl bg-white rounded-lg shadow-lg border-4 border-red-500">
            <h2 className="text-4xl font-bold text-red-600 mb-4">
              Редактирование: {editedReport.title}
            </h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Заголовок</label>
              <input
                id="title"
                name="title"
                type="text"
                value={editedReport.title}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="summary" className="block text-lg font-semibold text-gray-700">Описание</label>
              <textarea
                id="summary"
                name="summary"
                value={editedReport.summary}
                onChange={handleInputChange}
                rows={6}
                className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
              />
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <button
                onClick={saveReport}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Сохранить изменения
              </button>
              <button
                onClick={closeReportModal}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportsPage;

'use client'
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]" onClick={onClose}>
      <div className="relative" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

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
  const router = useRouter();
  const [activeReport, setActiveReport] = useState<number | null>(null);
  const [editedReport, setEditedReport] = useState<{ id: number; title: string; summary: string } | null>(null);
  const [newReport, setNewReport] = useState<{ title: string; summary: string; file: File | null }>({
    title: '',
    summary: '',
    file: null
  });
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [showDeleteReportModal, setShowDeleteReportModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showReportDeleteConfirmation, setShowReportDeleteConfirmation] = useState(false);

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

  const handleNewReportInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReport((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewReport((prevState) => ({
      ...prevState,
      file
    }));
  };

  const saveReport = () => {
    console.log('Отчёт сохранён:', editedReport);
    closeReportModal();
  };

  const addNewReport = () => {
    const newReportData = {
      id: reportsData.length + 1,
      title: newReport.title,
      date: new Date().toLocaleDateString(),
      summary: newReport.summary
    };
    reportsData.push(newReportData);
    console.log('Новый отчёт добавлен:', newReportData);
    setShowAddReportModal(false);
    setNewReport({ title: '', summary: '', file: null });
  };

  const deleteReport = (id: number) => {
    const index = reportsData.findIndex((report) => report.id === id);
    if (index !== -1) {
      reportsData.splice(index, 1);
      console.log('Отчёт удалён:', id);
      setReportToDelete(null);
      setShowDeleteReportModal(false);
      setShowDeleteConfirmation(false);
      setShowReportDeleteConfirmation(false);
      if (activeReport === id) {
        closeReportModal();
      }
    }
  };

  const confirmDelete = (id: number) => {
    setReportToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmReportDelete = (id: number) => {
    setReportToDelete(id);
    setShowReportDeleteConfirmation(true);
  };

  const openDeleteReportModal = () => {
    setShowDeleteReportModal(true);
  };

  return (
    <section className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
      <div className="p-4 bg-white bg-opacity-90 rounded-lg mb-6 text-center border-2 border-red-500">
        <h1 className="text-4xl font-bold text-red-600">Отчёты</h1>
        <p className="text-gray-700 mt-4 text-xl">Сводка последних отчётов и аналитики.</p><br />
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddReportModal(true)}
            className="mb-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Добавить отчёт
          </button>
          <button
            onClick={() => router.push('/lk/reports/create')}
            className="mb-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Создать отчёт
          </button>
          <button
            onClick={openDeleteReportModal}
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
            className="p-8 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-red-500 cursor-pointer"
            onClick={() => openReportModal(report.id)}
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4">{report.title}</h2>
            <p className="text-gray-600 italic mb-4 text-lg">{report.date}</p>
            <p className="text-gray-700 line-clamp-3">{report.summary}</p>
          </article>
        ))}
      </div>

      {showAddReportModal && (
        <Modal isOpen={showAddReportModal} onClose={() => setShowAddReportModal(false)}>
          <div className="p-8 max-w-2xl bg-white rounded-lg shadow-lg border-2 border-red-500">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Добавить новый отчёт</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newReportData = {
                id: reportsData.length + 1,
                title: newReport.title,
                date: new Date().toLocaleDateString(),
                summary: newReport.summary
              };
              reportsData.push(newReportData);
              setShowAddReportModal(false);
              setNewReport({ title: '', summary: '', file: null });
            }}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Заголовок</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={newReport.title}
                  onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="summary" className="block text-lg font-semibold text-gray-700">Описание</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={newReport.summary}
                  onChange={(e) => setNewReport(prev => ({ ...prev, summary: e.target.value }))}
                  rows={6}
                  className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-lg font-semibold text-gray-700">Прикрепить файл</label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(e) => setNewReport(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                  className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Добавить отчёт
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReportModal(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Закрыть
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      <Modal isOpen={showDeleteReportModal} onClose={() => setShowDeleteReportModal(false)}>
        <div className="p-8 max-w-2xl bg-white rounded-lg shadow-lg border-2 border-red-500">
          <h2 className="text-4xl font-bold text-red-600 mb-4">Удалить отчёт</h2>
          <p className="mb-4">Выберите отчёт для удаления:</p>
          <div className="grid gap-2">
            {reportsData.map((report) => (
              <button
                key={report.id}
                onClick={() => confirmDelete(report.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {report.title}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowDeleteReportModal(false)}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Закрыть
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={showDeleteConfirmation} 
        onClose={() => {
          setShowDeleteConfirmation(false);
          setReportToDelete(null);
        }}
      >
        <div className="p-8 max-w-md bg-white rounded-lg shadow-lg border-2 border-red-500">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Подтверждение удаления</h2>
          <p className="mb-6">Вы уверены, что хотите удалить этот отчёт? Это действие нельзя отменить.</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => deleteReport(reportToDelete!)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Удалить
            </button>
            <button
              onClick={() => {
                setShowDeleteConfirmation(false);
                setReportToDelete(null);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showReportDeleteConfirmation} 
        onClose={() => {
          setShowReportDeleteConfirmation(false);
          setReportToDelete(null);
        }}
      >
        <div className="p-8 max-w-md bg-white rounded-lg shadow-lg border-2 border-red-500">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Подтверждение удаления</h2>
          <p className="mb-6">Вы уверены, что хотите удалить этот отчёт? Это действие нельзя отменить.</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => deleteReport(reportToDelete!)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Удалить
            </button>
            <button
              onClick={() => {
                setShowReportDeleteConfirmation(false);
                setReportToDelete(null);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!activeReport} onClose={closeReportModal}>
        <div className="p-8 max-w-2xl bg-white rounded-lg shadow-lg border-2 border-red-500">
          <h2 className="text-4xl font-bold text-red-600 mb-4">
            Редактирование: {editedReport?.title}
          </h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Заголовок</label>
            <input
              id="title"
              name="title"
              type="text"
              value={editedReport?.title}
              onChange={handleInputChange}
              className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="block text-lg font-semibold text-gray-700">Описание</label>
            <textarea
              id="summary"
              name="summary"
              value={editedReport?.summary}
              onChange={handleInputChange}
              rows={6}
              className="w-full p-3 bg-white rounded-lg border-2 border-gray-300 mt-2"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={saveReport}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Сохранить изменения
            </button>
            <button
              onClick={() => confirmReportDelete(editedReport!.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Удалить отчёт
            </button>
            <button
              onClick={closeReportModal}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ReportsPage;

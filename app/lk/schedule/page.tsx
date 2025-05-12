"use client"

import { useState, useMemo, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

interface Shift {
  id: number;
  date: string; // Пример: '2025-05-12'
  startTime: string; // Пример: '2025-05-12T06:00:00.000Z'
  endTime: string; // Пример: '2025-05-12T18:00:00.000Z'
  type: 'Дневная' | 'Ночная';
  status: 'Текущая' | 'Предстоящая' | 'Прошедшая';
}

// Форматирование времени
const formatTime = (timeStr: string) => {
  try {
    const date = parseISO(timeStr); // Используем parseISO для правильного парсинга
    return format(date, "yyyy-MM-dd HH:mm"); // Форматируем и дату, и время
  } catch (e) {
    return "Дата не указана";
  }
};

// Функция для вычисления статуса смены
const getShiftStatus = (shift: Shift): Shift['status'] => {
  const now = new Date();
  const shiftStart = parseISO(`${shift.date}T${shift.startTime}`);
  const shiftEnd = parseISO(`${shift.date}T${shift.endTime}`);

  // Если ночная смена (конец раньше старта по времени)
  if (shiftEnd <= shiftStart) shiftEnd.setDate(shiftEnd.getDate() + 1);

  if (now >= shiftStart && now <= shiftEnd) {
    return 'Текущая';
  } else if (now < shiftStart) {
    return 'Предстоящая';
  } else {
    return 'Прошедшая';
  }
};

const ShiftCard = ({ shift }: { shift: Shift }) => {
  const [expanded, setExpanded] = useState(false);

  const { timeHint } = useMemo(() => {
    let hint = '';
    const now = new Date();
    const shiftStart = parseISO(`${shift.date}T${shift.startTime}`);
    const shiftEnd = parseISO(`${shift.date}T${shift.endTime}`);

    // Если ночная смена (конец раньше старта по времени)
    if (shiftEnd <= shiftStart) shiftEnd.setDate(shiftEnd.getDate() + 1);

    // Проверяем, корректно ли получились даты
    if (isNaN(shiftStart.getTime()) || isNaN(shiftEnd.getTime())) {
      console.error('Некорректные данные для времени смены:', shift.startTime, shift.endTime);
      hint = 'Ошибка в данных';
    } else {
      if (shift.status === 'Предстоящая') {
        const diffHours = Math.round((shiftStart.getTime() - now.getTime()) / (1000 * 60 * 60));
        hint = `Через ${diffHours} ч`;
      } else if (shift.status === 'Прошедшая') {
        const diffHours = Math.round((now.getTime() - shiftEnd.getTime()) / (1000 * 60 * 60));
        hint = `${diffHours} ч назад`;
      } else {
        hint = 'Идёт сейчас';
      }
    }

    return { timeHint: hint };
  }, [shift]);

  return (
    <div
      className="p-4 bg-white/70 dark:bg-white-900/70 rounded-lg shadow-lg border-2 border-red-500 transition transform hover:scale-[1.02] cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`text-3xl mr-3 ${shift.type === 'Дневная' ? 'text-yellow-500' : 'text-blue-500'}`}>
            {shift.type === 'Дневная' ? '☀️' : '🌙'}
          </span>
          <div>
            <p className="text-lg font-semibold">{shift.date}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
            </p>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 text-sm text-red-600 animate-fade-in">
          <p>
            Тип: <span className={`font-medium ${shift.type === 'Дневная' ? 'text-yellow-500' : 'text-blue-500'}`}>{shift.type}</span>
          </p>
          <p>
            Статус:{' '}
            <span
              className={`font-medium ${
                shift.status === 'Текущая'
                  ? 'text-red-600'
                  : shift.status === 'Предстоящая'
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}
            >
              {shift.status}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const SchedulePage = () => {
  const [filterStatus, setFilterStatus] = useState<'Все' | 'Предстоящая' | 'Прошедшая'>('Все');
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    async function fetchShifts() {
      try {
        const response = await fetch('/api/shifts');
        if (!response.ok) throw new Error('Ошибка загрузки смен');

        let data: Shift[] = await response.json();

        // Проставляем правильный статус каждой смене
        data = data.map(shift => ({
          ...shift,
          status: getShiftStatus(shift),
        }));

        setShifts(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchShifts();
  }, []);

  const currentShift = useMemo(() => shifts.find(shift => shift.status === 'Текущая'), [shifts]);
  const otherShifts = useMemo(
    () =>
      shifts.filter(
        shift =>
          shift.status !== 'Текущая' && (filterStatus === 'Все' || shift.status === filterStatus)
      ),
    [shifts, filterStatus]
  );

  return (
    <div className="p-6 m-4 bg-white/50 dark:bg-white-800/50 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
      <div className="p-1 bg-white/90 dark:bg-white-700/70 rounded-lg mb-4 text-center border-2 border-red-500">
        <h1 className="text-3xl font-semibold text-red-500">Ваше расписание смен</h1>
      </div>

      {currentShift && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">🟢 Текущая смена</h2>
          <ShiftCard shift={currentShift} />
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {(['Все', 'Предстоящая', 'Прошедшая'] as const).map(status => (
          <button
            key={status}
            className={`px-4 py-2 rounded-full border-2 ${
              filterStatus === status ? 'bg-red-500 text-white' : 'border-red-500 text-white'
            } hover:bg-red-600 hover:text-red-200 transition`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherShifts.length > 0 ? (
          otherShifts.map(shift => <ShiftCard key={shift.id} shift={shift} />)
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">Нет смен по фильтру.</p>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;

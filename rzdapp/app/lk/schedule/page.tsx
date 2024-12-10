'use client';

interface Shift {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  type: 'Дневная' | 'Ночная';
  status: 'Текущая' | 'Предстоящая' | 'Прошедшая';
}

const SchedulePage = () => {
  // Тестовые данные для смен
  const testShifts: Shift[] = [
    { id: 1, date: '2024-12-09', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Текущая' },
    { id: 2, date: '2024-12-10', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
    { id: 3, date: '2024-12-11', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
    { id: 4, date: '2024-12-12', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Предстоящая' },
    { id: 5, date: '2024-12-13', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Предстоящая' },
    { id: 6, date: '2024-12-08', startTime: '20:00', endTime: '08:00', type: 'Ночная', status: 'Прошедшая' },
    { id: 7, date: '2024-12-07', startTime: '08:00', endTime: '20:00', type: 'Дневная', status: 'Прошедшая' },
  ];

  // Разделяем смены по статусу
  const currentShift = testShifts.find(shift => shift.status === 'Текущая');
  const upcomingShifts = testShifts.filter(shift => shift.status === 'Предстоящая');
  const pastShifts = testShifts.filter(shift => shift.status === 'Прошедшая');

  return (
    <div className="p-6 m-4 bg-white bg-opacity-50 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
        <div className="p-1 bg-white bg-opacity-90 rounded-lg mb-1 text-center border-2 border-red-500">
            <h1 className="text-3xl font-semibold text-red-500">Ваше расписание смен</h1>
        </div>

      {/* Текущая смена */}
      {currentShift ? (
        <div className="mb-6 p-4 bg-opacity-90 bg-red-100 rounded-lg shadow border border-red-500">
          <h2 className="text-xl font-medium mb-2">Текущая смена</h2>
          <p>Дата: {currentShift.date}</p>
          <p>Время: {currentShift.startTime} - {currentShift.endTime}</p>
          <p>Тип: {currentShift.type}</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600">
            Посмотреть задачи
          </button>
        </div>
      ) : (
        <p className="mb-6 text-gray-500">Сейчас у вас нет активной смены.</p>
      )}

      {/* Предстоящие смены */}
    <div className="mb-6">
        <div className="p-1 bg-white rounded-lg mb-1 text-center border-2 border-red-500">
            <h2 className="text-2xl font-semibold text-red-500">Предстоящие смены</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingShifts.map(shift => (
            <div key={shift.id} className="p-4 bg-white rounded-lg shadow border border-red-500">
              <p>Дата: {shift.date}</p>
              <p>Время: {shift.startTime} - {shift.endTime}</p>
              <p>Тип: {shift.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* История смен */}
    <div>
        <div className="p-1 bg-white rounded-lg mb-1 text-center border-2 border-red-500">
            <h2 className="text-2xl font-semibold text-red-500">Прошедшие смены</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastShifts.map(shift => (
            <div key={shift.id} className="p-4 bg-gray-100 rounded-lg shadow border border-red-500">
              <p>Дата: {shift.date}</p>
              <p>Время: {shift.startTime} - {shift.endTime}</p>
              <p>Тип: {shift.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;

'use client';

const FaqPage = () => {
  return (
    <div className="min-h-screen flex-col overflow-hidden p-10 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg flex items-center justify-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">FAQ</h1>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Как изменить пароль?</h2>
          <p className="text-gray-700 mt-2">
            Чтобы изменить пароль, перейдите в раздел "Личный кабинет", выберите "Настройки" и
            нажмите на кнопку "Изменить пароль".
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Как связаться с поддержкой?</h2>
          <p className="text-gray-700 mt-2">
            Вы можете связаться с нашей поддержкой через чат, который доступен в разделе "Чат с
            поддержкой".
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Как добавить отчёт?</h2>
          <p className="text-gray-700 mt-2">
            На странице отчётов нажать на "Добавить отчёт"
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Где узнать смену?</h2>
          <p className="text-gray-700 mt-2">
            На странице смены
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Где поменять почту?</h2>
          <p className="text-gray-700 mt-2">
            В профиле или через отдел кадров.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Почему у меня нет задач?</h2>
          <p className="text-gray-700 mt-2">
            Возможно вы всё выполнили. Если вы уверены что они точно должны быть там, то стоит обратиться в поддержку.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Почему сайт не работает?</h2>
          <p className="text-gray-700 mt-2">
            Чаще всего вы были выкинуты из сесии в качестве безопасности. Перезапустите страницу или браузер.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Почему "Моя команда" пустая?</h2>
          <p className="text-gray-700 mt-2">
            Возможно вы одни к поманде, если это не так, то стоит обратиться в поддержку что бы выяснить причину.
          </p>
        </div>

      </div>
    </div>
  );
};

export default FaqPage;

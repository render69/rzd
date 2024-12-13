'use client';

const FaqPage = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg">
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
      </div>
    </div>
  );
};

export default FaqPage;

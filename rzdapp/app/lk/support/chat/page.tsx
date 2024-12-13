'use client';

import { FaCommentDots } from 'react-icons/fa';

const ChatPage = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Чат с поддержкой
      </h1>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaCommentDots className="mr-3 text-3xl text-red-600" />
            <h2 className="text-2xl font-semibold">Начните чат с нами</h2>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">Добрый день! Чем мы можем помочь?</p>
          </div>
          <div className="mt-6 flex flex-col items-start space-y-4">
            <input
              type="text"
              placeholder="Введите сообщение..."
              className="w-full p-4 bg-gray-50 rounded-lg border-2 border-gray-300"
            />
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

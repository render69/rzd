'use client';

import { FaCommentDots } from 'react-icons/fa';

const ChatPage = () => {
  return (
    <div className="min-h-screen flex-col overflow-hidden p-10 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg border-2 border-red-500">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Чат с поддержкой
        </h1>
        <div className="flex flex-col items-center justify-center space-y-8 h-full border-2 border-red-500 shadow-lg rounded-lg">
          <div className="w-full bg-white p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <FaCommentDots className="mr-4 text-4xl text-red-600" />
              <h2 className="text-3xl font-semibold">Начните чат с нами</h2>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg mb-6 border-2 border-red-500">
              <p className="text-gray-700 text-lg">Добрый день! Чем мы можем помочь?</p>
            </div>
            <div className="mt-6 flex flex-col items-start space-y-4 w-full">
              <input
                type="text"
                placeholder="Введите сообщение..."
                className="w-full p-4 bg-gray-50 rounded-lg border-2 border-gray-300 border border-red-500"
              />
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

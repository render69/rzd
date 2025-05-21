'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaMicrophone, FaMicrophoneSlash, FaHeadset, FaPaperPlane, FaUsers, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

interface Message {
    id: string;
    user: string;
    content: string;
    timestamp: string;
}

interface Participant {
    id: string;
    name: string;
    isMentor: boolean;
    isSpeaking: boolean;
    isMuted: boolean;
}

const mockParticipants: Participant[] = [
    { id: '1', name: 'Иванов И.И.', isMentor: true, isSpeaking: false, isMuted: false },
    { id: '2', name: 'Петров П.П.', isMentor: false, isSpeaking: true, isMuted: false },
    { id: '3', name: 'Сидоров С.С.', isMentor: false, isSpeaking: false, isMuted: true },
];

const mockMessages: Message[] = [
    { id: '1', user: 'Иванов И.И.', content: 'Добро пожаловать на занятие!', timestamp: '14:00' },
    { id: '2', user: 'Петров П.П.', content: 'Спасибо! Рад присоединиться.', timestamp: '14:01' },
];

const MAX_MESSAGE_LENGTH = 500;

const VirtualClassSession: React.FC<{ params: { id: string } }> = ({ params }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isDeafened, setIsDeafened] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setIsLoading(true);
                // TODO: Replace with actual API calls
                // const [classData, participantsData, messagesData] = await Promise.all([
                //     fetch(`/api/virtual-classes/${params.id}`),
                //     fetch(`/api/virtual-classes/${params.id}/participants`),
                //     fetch(`/api/virtual-classes/${params.id}/messages`)
                // ]);
                
                // Temporary mock data
                setParticipants(mockParticipants);
                setMessages(mockMessages);
            } catch (err) {
                setError('Не удалось загрузить данные занятия. Пожалуйста, попробуйте позже.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchClassData();
    }, [params.id]);

    useEffect(() => {
        // Auto-scroll to bottom when new messages arrive
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isSending) {
            try {
                setIsSending(true);
                // TODO: Replace with actual API call
                // await fetch(`/api/virtual-classes/${params.id}/messages`, {
                //     method: 'POST',
                //     body: JSON.stringify({ content: message })
                // });

                const newMessage: Message = {
                    id: Date.now().toString(),
                    user: 'Вы',
                    content: message,
                    timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, newMessage]);
                setMessage('');
            } catch (err) {
                setError('Не удалось отправить сообщение. Пожалуйста, попробуйте снова.');
            } finally {
                setIsSending(false);
            }
        }
    };

    const handleLeave = () => {
        setShowLeaveConfirm(true);
    };

    const confirmLeave = () => {
        // TODO: Add cleanup logic (disconnect from voice channel, etc.)
        router.push('/lk/learning/online/virtual-classes');
    };

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-500 max-w-md w-full text-center">
                    <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                    <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Подключение к занятию...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={handleLeave}
                        className="text-gray-100 hover:text-red-100 h-10 w-10 flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full"
                        aria-label="Выйти из занятия"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                    <h1 className="text-xl font-semibold text-red-600">Основы безопасности на железной дороге</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-2 rounded-full ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                        aria-label={isMuted ? 'Включить микрофон' : 'Выключить микрофон'}
                    >
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    </button>
                    <button
                        onClick={() => setIsDeafened(!isDeafened)}
                        className={`p-2 rounded-full ${isDeafened ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                        aria-label={isDeafened ? 'Включить звук' : 'Выключить звук'}
                    >
                        <FaHeadset className={isDeafened ? 'text-red-600' : ''} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Voice Channel */}
                <div className="w-1/4 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <FaUsers className="mr-2" aria-hidden="true" /> 
                        Участники ({participants.length})
                    </h2>
                    <div className="space-y-3">
                        {participants.map((participant) => (
                            <div
                                key={participant.id}
                                className={`flex items-center p-2 rounded-lg ${
                                    participant.isSpeaking ? 'bg-green-50' : 'bg-gray-50'
                                }`}
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-gray-700">
                                        {participant.name}
                                        {participant.isMentor && (
                                            <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                                Ментор
                                            </span>
                                        )}
                                    </p>
                                </div>
                                {participant.isMuted && (
                                    <FaMicrophoneSlash className="text-red-500" aria-label="Микрофон выключен" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col bg-white">
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg) => (
                            <div key={msg.id} className="mb-4">
                                <div className="flex items-baseline">
                                    <span className="font-semibold text-gray-700">{msg.user}</span>
                                    <span className="ml-2 text-xs text-gray-500">{msg.timestamp}</span>
                                </div>
                                <p className="text-gray-600 mt-1">{msg.content}</p>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
                        <div className="flex space-x-4">
                            <input
                                ref={messageInputRef}
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                                placeholder="Введите сообщение..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                                disabled={isSending}
                                maxLength={MAX_MESSAGE_LENGTH}
                                aria-label="Сообщение чата"
                            />
                            <button
                                type="submit"
                                className={`bg-red-600 h-12 w-12 text-white px-4 py-2 rounded-lg transition-colors ${
                                    isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                                }`}
                                disabled={isSending || !message.trim()}
                                aria-label="Отправить сообщение"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                        {message.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1 text-right">
                                {message.length}/{MAX_MESSAGE_LENGTH}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Leave Confirmation Modal */}
            {showLeaveConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Выйти из занятия?</h3>
                        <p className="text-gray-600 mb-6">Вы уверены, что хотите покинуть занятие?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLeaveConfirm(false)}
                                className="px-4 py-2 text-gray-300 hover:text-gray-400"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={confirmLeave}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VirtualClassSession; 
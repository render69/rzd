'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    patronymic: string;
    city: string;
    street: string;
    house: string;
    apartment: string;
    experience: number;
    post: string;
    email: string;
    phone: string;
    avatar: string;
    teamId?: number;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                router.push('/');
            }
        };

        fetchUser();
    }, [router]);

    const handleSave = async () => {
        if (!user) return;
        
        setLoading(true);
        try {
            const res = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (res.ok) {
                setIsEditing(false);
            } else {
                alert('Ошибка при сохранении данных');
            }
        } catch (error) {
            alert('Ошибка при сохранении данных');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C8050E]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Мой профиль</h1>
                    <p className="text-lg sm:text-xl text-gray-600">Управление личной информацией</p>
                </div>

                <Card className="bg-gradient-to-r from-[#C8050E] to-[#A0040B] text-white">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                        <div className="relative">
                            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <FaUser className="text-6xl text-white/70" />
                                )}
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#C8050E] hover:bg-gray-100 transition-colors">
                                    <FaEdit className="text-sm" />
                                </button>
                            )}
                        </div>
                        
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-3xl font-bold mb-2">
                                {user.name} {user.surname} {user.patronymic}
                            </h2>
                            <p className="text-xl text-white/90 mb-4">{user.post}</p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
                                <div className="flex items-center space-x-2">
                                    <FaEnvelope className="text-white/70" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaPhone className="text-white/70" />
                                    <span>{user.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaMapMarkerAlt className="text-white/70" />
                                    <span>{user.city}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            {isEditing ? (
                                <>
                                    <Button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="bg-white text-[#C8050E] hover:bg-gray-100"
                                    >
                                        <FaSave className="mr-2" />
                                        {loading ? 'Сохранение...' : 'Сохранить'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditing(false)}
                                        className="border-white text-white hover:bg-white hover:text-[#C8050E]"
                                    >
                                        <FaTimes className="mr-2" />
                                        Отмена
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-white text-[#C8050E] hover:bg-gray-100"
                                >
                                    <FaEdit className="mr-2" />
                                    Редактировать
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <FaUser className="mr-2 text-[#C8050E]" />
                            Личная информация
                        </h3>
                        <div className="space-y-4">
                            <Input
                                label="Имя"
                                value={user.name}
                                onChange={(e) => setUser({...user, name: e.target.value})}
                                disabled={!isEditing}
                            />
                            <Input
                                label="Фамилия"
                                value={user.surname}
                                onChange={(e) => setUser({...user, surname: e.target.value})}
                                disabled={!isEditing}
                            />
                            <Input
                                label="Отчество"
                                value={user.patronymic}
                                onChange={(e) => setUser({...user, patronymic: e.target.value})}
                                disabled={!isEditing}
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                disabled={!isEditing}
                                icon={<FaEnvelope className="text-gray-400" />}
                            />
                            <Input
                                label="Телефон"
                                value={user.phone}
                                onChange={(e) => setUser({...user, phone: e.target.value})}
                                disabled={!isEditing}
                                icon={<FaPhone className="text-gray-400" />}
                            />
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <FaBriefcase className="mr-2 text-[#C8050E]" />
                            Рабочая информация
                        </h3>
                        <div className="space-y-4">
                            <Input
                                label="Должность"
                                value={user.post}
                                onChange={(e) => setUser({...user, post: e.target.value})}
                                disabled={!isEditing}
                            />
                            <Input
                                label="Опыт работы (лет)"
                                type="number"
                                value={user.experience}
                                onChange={(e) => setUser({...user, experience: parseInt(e.target.value) || 0})}
                                disabled={!isEditing}
                            />
                            <div className="pt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Стаж в компании
                                </label>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <span>{user.experience} лет</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-[#C8050E]" />
                        Адрес
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Input
                            label="Город"
                            value={user.city}
                            onChange={(e) => setUser({...user, city: e.target.value})}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Улица"
                            value={user.street}
                            onChange={(e) => setUser({...user, street: e.target.value})}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Дом"
                            value={user.house}
                            onChange={(e) => setUser({...user, house: e.target.value})}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Квартира"
                            value={user.apartment}
                            onChange={(e) => setUser({...user, apartment: e.target.value})}
                            disabled={!isEditing}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
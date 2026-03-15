'use client';

import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Image from 'next/image';
import { FaUsers, FaEdit, FaSave, FaTimes, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    image: string;
}

const TeamPage: React.FC = () => {
    const [teamData, setTeamData] = useState<TeamMember[]>([]);
    const [activeMember, setActiveMember] = useState<number | null>(null);
    const [editedMember, setEditedMember] = useState<TeamMember | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const res = await fetch('/api/team');
                if (res.ok) {
                    const data = await res.json();
                    setTeamData(data);
                } else {
                    setTeamData([
                        {
                            id: 1,
                            name: 'Иван Петров',
                            role: 'Менеджер команды',
                            email: 'ivan.petrov@rzd.ru',
                            phone: '+7 (495) 123-45-67',
                            image: '/img/default-avatar.jpg'
                        },
                        {
                            id: 2,
                            name: 'Мария Сидорова',
                            role: 'Старший специалист',
                            email: 'maria.sidorova@rzd.ru',
                            phone: '+7 (495) 123-45-68',
                            image: '/img/default-avatar.jpg'
                        },
                        {
                            id: 3,
                            name: 'Алексей Козлов',
                            role: 'Специалист',
                            email: 'alexey.kozlov@rzd.ru',
                            phone: '+7 (495) 123-45-69',
                            image: '/img/default-avatar.jpg'
                        }
                    ]);
                }
            } catch (error) {
                console.error('Ошибка загрузки команды:', error);
                setTeamData([
                    {
                        id: 1,
                        name: 'Иван Петров',
                        role: 'Менеджер команды',
                        email: 'ivan.petrov@rzd.ru',
                        phone: '+7 (495) 123-45-67',
                        image: '/img/default-avatar.jpg'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    const openMemberModal = (id: number) => {
        const member = teamData.find((member) => member.id === id);
        if (member) {
            setActiveMember(id);
            setEditedMember({ ...member });
        }
    };

    const closeMemberModal = () => {
        setActiveMember(null);
        setEditedMember(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedMember) {
            setEditedMember((prev) => ({
                ...prev!,
                [name]: value,
            }));
        }
    };

    const saveMember = () => {
        if (editedMember) {
            setTeamData(prev =>
                prev.map(member =>
                    member.id === editedMember.id ? editedMember : member
                )
            );
            console.log('Сохранение данных (в будущем — API-запрос):', editedMember);
            closeMemberModal();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C8050E]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                        <FaUsers className="mr-3 text-[#C8050E]" />
                        Моя команда
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">Информация о текущих членах команды</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {teamData.map((member) => (
                        <Card
                            key={member.id}
                            hover
                            className="cursor-pointer text-center"
                            onClick={() => openMemberModal(member.id)}
                        >
                            <div className="space-y-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gray-100 rounded-full overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">{member.name}</h2>
                                    <p className="text-sm sm:text-base text-gray-600">{member.role}</p>

                                    <div className="space-y-1 text-xs sm:text-sm text-gray-500">
                                        <div className="flex items-center justify-center space-x-1">
                                            <FaEnvelope className="text-gray-400" />
                                            <span className="truncate">{member.email}</span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-1">
                                            <FaPhone className="text-gray-400" />
                                            <span>{member.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Button variant="ghost" size="sm" className="text-[#C8050E] hover:text-[#A0040B]">
                                        <FaEdit className="mr-1" />
                                        Редактировать
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {teamData.length === 0 && (
                    <Card className="text-center py-12">
                        <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Команда пуста</h3>
                        <p className="text-gray-500">Пока нет участников команды</p>
                    </Card>
                )}

                <Modal isOpen={!!activeMember} onClose={closeMemberModal} size="md">
                    {editedMember && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full overflow-hidden mb-4">
                                    <Image
                                        src={editedMember.image}
                                        alt={editedMember.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{editedMember.name}</h2>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="Имя"
                                    name="name"
                                    value={editedMember.name}
                                    onChange={handleInputChange}
                                    icon={<FaUser className="text-gray-400" />}
                                />

                                <Input
                                    label="Должность"
                                    name="role"
                                    value={editedMember.role}
                                    onChange={handleInputChange}
                                />

                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={editedMember.email}
                                    onChange={handleInputChange}
                                    icon={<FaEnvelope className="text-gray-400" />}
                                />

                                <Input
                                    label="Телефон"
                                    name="phone"
                                    type="tel"
                                    value={editedMember.phone}
                                    onChange={handleInputChange}
                                    icon={<FaPhone className="text-gray-400" />}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={saveMember}
                                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <FaSave />
                                    <span>Сохранить</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={closeMemberModal}
                                    className="flex items-center space-x-2"
                                >
                                    <FaTimes />
                                    <span>Отмена</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default TeamPage;
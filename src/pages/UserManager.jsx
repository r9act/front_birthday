import React, { useState } from 'react';
import { createUser, getUserByForeignId } from '../api/api';

const UserManager = () => {
    const [foreignId, setForeignId] = useState('');
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await getUserByForeignId(foreignId);
            setUser(response.data);
        } catch (error) {
            console.error('Ошибка:', error);
            setUser(null);
        }
    };

    const handleCreateUser = async () => {
        const userData = { name: 'Новый пользователь' }; // Замени на свои поля
        try {
            const response = await createUser(userData);
            setForeignId(response.data);
            fetchUser();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Управление пользователями</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={foreignId}
                        onChange={(e) => setForeignId(e.target.value)}
                        placeholder="Введите foreignId"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-x-4">
                    <button
                        onClick={fetchUser}
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Найти
                    </button>
                    <button
                        onClick={handleCreateUser}
                        className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                    >
                        Создать
                    </button>
                </div>
                {user && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p>Имя: {user.name}</p>
                        <p>ID: {foreignId}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManager;
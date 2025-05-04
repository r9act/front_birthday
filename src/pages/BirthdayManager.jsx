import React from 'react';
import { saveUserBirthdays, getUserBirthdays } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const BirthdayManager = () => {
    const [foreignId, setForeignId] = useState('');
    const [birthdays, setBirthdays] = useState([]);
    const [newBirthday, setNewBirthday] = useState({ name: '', date: '' });
    const [userRoles, setUserRoles] = useState([]); // Состояние для ролей
    const navigate = useNavigate();

    /**
     * Извлечение foreignId и ролей из JWT-токена
     */
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded JWT:', decoded); // Отладка структуры токена
                setForeignId(decoded.sub);
                setUserRoles(decoded.roles || []);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [navigate]);

    const fetchBirthdays = async () => {
        try {
            const response = await getUserBirthdays(foreignId);
            setBirthdays(response.data);
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    alert('Сессия истекла. Пожалуйста, войдите снова.');
                } else if (status === 403) {
                    alert(data.message || 'Доступ запрещен.');
                } else if (status === 404) {
                    alert(data.message || 'Пользователь с указанным foreignId не найден.');
                    setBirthdays([]);
                } else {
                    alert(data.message || 'Произошла ошибка при загрузке данных.');
                    console.error('Ошибка:', status, data);
                }
            } else {
                alert('Ошибка сети. Проверьте подключение.');
                console.error('Ошибка сети:', error.message);
            }
        }
    };

    const handleAddBirthday = async () => {
        const birthdayData = [newBirthday];
        try {
            await saveUserBirthdays(foreignId, birthdayData);
            setNewBirthday({ name: '', date: '' });
            fetchBirthdays();
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    alert('Сессия истекла. Пожалуйста, войдите снова.');
                } else if (status === 403) {
                    alert(data.message || 'Доступ запрещен.');
                } else if (status === 404) {
                    alert(data.message || 'Пользователь с указанным foreignId не найден.');
                } else {
                    alert(data.message || 'Произошла ошибка при сохранении данных.');
                    console.error('Ошибка:', status, data);
                }
            } else {
                alert('Ошибка сети. Проверьте подключение.');
                console.error('Ошибка сети:', error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Управление днями рождения</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={foreignId}
                        onChange={(e) => setForeignId(e.target.value)}
                        placeholder="Введите foreignId пользователя"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="mb-4 space-y-2">
                    <input
                        type="text"
                        value={newBirthday.name}
                        onChange={(e) => setNewBirthday({ ...newBirthday, name: e.target.value })}
                        placeholder="Имя"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="date"
                        value={newBirthday.date}
                        onChange={(e) => setNewBirthday({ ...newBirthday, date: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="space-x-4">
                    <button
                        onClick={handleAddBirthday}
                        className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
                    >
                        Добавить
                    </button>
                    <button
                        onClick={fetchBirthdays}
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Показать
                    </button>
                </div>
                <ul className="mt-4 space-y-2">
                    {birthdays.map((b, index) => (
                        <li key={index} className="p-2 bg-gray-50 rounded-lg">
                            {b.name} - {b.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BirthdayManager;
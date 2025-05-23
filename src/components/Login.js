import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Успешный вход! Токен:', data.token);
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setError(data.message || 'Неверный логин или пароль');
            }
        } catch (err) {
            setError('Ошибка соединения с сервером');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">
                            Имя пользователя:
                            <input
                                type="text"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder="Введите имя пользователя"
                                disabled={loading}
                                className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    loading ? 'bg-gray-200 cursor-not-allowed' : ''
                                }`}
                            />
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 text-gray-700">
                            Пароль:
                            <input
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Введите пароль"
                                disabled={loading}
                                className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    loading ? 'bg-gray-200 cursor-not-allowed' : ''
                                }`}
                            />
                        </label>
                    </div>
                    {error && (
                        <p className="text-red-500 mb-4">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 rounded-lg text-white font-semibold transition-colors ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {loading ? 'Загрузка...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
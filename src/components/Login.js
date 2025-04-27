import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class LoginClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '', loading: true });

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Успешный вход! Токен:', data.token);
                localStorage.setItem('token', data.token);
                this.props.navigate('/home');
            } else {
                this.setState({ error: data.message || 'Неверный логин или пароль' });
            }
        } catch (err) {
            this.setState({ error: 'Ошибка соединения с сервером' });
            console.error(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-700">
                                Имя пользователя:
                                <input
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                    placeholder="Введите имя пользователя"
                                    disabled={this.state.loading}
                                    className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        this.state.loading ? 'bg-gray-200 cursor-not-allowed' : ''
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
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    placeholder="Введите пароль"
                                    disabled={this.state.loading}
                                    className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        this.state.loading ? 'bg-gray-200 cursor-not-allowed' : ''
                                    }`}
                                />
                            </label>
                        </div>
                        {this.state.error && (
                            <p className="text-red-500 mb-4">{this.state.error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={this.state.loading}
                            className={`w-full p-3 rounded-lg text-white font-semibold transition-colors ${
                                this.state.loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {this.state.loading ? 'Загрузка...' : 'Войти'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

/**
 * Эта обертка — функциональный компонент, который:
 *
 * Использует хук useNavigate из react-router-dom v6, чтобы получить функцию navigate.
 * Передает эту функцию navigate как пропс (navigate={navigate}) в ваш классовый компонент LoginClass.
 * Экспортируется как основной компонент Login, заменяя сам LoginClass.
 * Зачем это нужно?
 * Причина связана с тем, как работает react-router-dom версии 6 и ограничениями классовых компонентов в React:
 *
 * useNavigate — это хук:
 * В react-router-dom v6 навигация осуществляется через хук useNavigate, который возвращает функцию для программного перехода между маршрутами (например, navigate('/home')).
 * Хуки (useNavigate, useState, и т.д.) можно использовать только в функциональных компонентах, а не в классовых.
 * Ваш Login — классовый компонент:
 * Ваш компонент LoginClass написан как класс (class LoginClass extends Component), и в нем нельзя напрямую вызвать useNavigate.
 * Однако вам нужно перенаправлять пользователя на /home после успешного входа, что требует доступа к навигации.
 * Устаревший withRouter:
 * В более старых версиях react-router-dom (v5 и ниже) вы могли использовать withRouter, чтобы передать объект history в классовый компонент через пропсы (this.props.history.push).
 * В v6 withRouter убрали, и стандартный способ навигации — это useNavigate.
 * Решение через обертку:
 * Чтобы "доставить" функцию navigate в ваш классовый компонент, мы создаем функциональный компонент-обертку Login.
 * Внутри этой обертки мы вызываем useNavigate, получаем функцию navigate и передаем ее в LoginClass как пропс.
 * Теперь в LoginClass вы можете использовать this.props.navigate('/home') вместо старого this.props.history.push('/home').
 */
// Обертка для передачи navigate
const Login = (props) => {
    const navigate = useNavigate();
    return <LoginClass {...props} navigate={navigate} />;
};

export default Login;
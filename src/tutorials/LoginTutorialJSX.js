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
            <div className="min-h-screen flex items-center justify-center bg-gray-100"> // Создает внешний контейнер, занимающий всю высоту экрана, с серым фоном и центрированием содержимого
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> // Создает внутренний контейнер для формы с белым фоном, отступами, закругленными углами, тенью и максимальной шириной
                    <h2 className="text-2xl font-bold text-center mb-6">Вход</h2> // Отображает заголовок "Вход" с большим шрифтом, жирным начертанием, центрированным выравниванием и отступом снизу
                    <form onSubmit={this.handleSubmit}> // Определяет форму, которая вызывает метод handleSubmit при отправке
                        <div className="mb-4"> // Создает группу для поля ввода имени пользователя с отступом снизу
                            <label className="block mb-1 text-gray-700"> // Создает метку для поля ввода с блочным отображением, небольшим отступом снизу и серым цветом текста
                                Имя пользователя: // Устанавливает текстовую подпись "Имя пользователя:" для поля ввода
                                <input
                                    type="text" // Устанавливает тип поля как текстовый
                                    name="username" // Добавляем name для идентификации поля как логина
                                    autoComplete="username" // Указываем, что это поле для имени пользователя
                                    value={this.state.username} // Связывает значение поля с состоянием this.state.username
                                    onChange={this.handleUsernameChange} // Обновляет состояние username при изменении текста в поле через метод handleUsernameChange
                                    placeholder="Введите имя пользователя" // Задает placeholder (подсказку), отображаемую, когда поле пустое
                                    disabled={this.state.loading} // Отключает поле ввода, если идет загрузка (this.state.loading = true)
                                    className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${this.state.loading ? 'bg-gray-200 cursor-not-allowed' : ''}`} // Применяет стили Tailwind: отступ сверху, полная ширина, отступы внутри, граница, закругленные углы, убирает стандартный контур при фокусе, добавляет синий ободок при фокусе, а также условно затемняет фон и меняет курсор при загрузке
                                />
                            </label> // Закрывает метку для имени пользователя
                        </div> // Закрывает группу для имени пользователя
                        <div className="mb-6"> // Создает группу для поля ввода пароля с большим отступом снизу
                            <label className="block mb-1 text-gray-700"> // Создает метку для поля ввода пароля с блочным отображением, небольшим отступом снизу и серым цветом текста
                                Пароль: // Устанавливает текстовую подпись "Пароль:" для поля ввода
                                <input
                                    type="password" // Устанавливает тип поля как пароль (скрывает вводимые символы)
                                    name="password" // Добавляем name для идентификации поля как пароля
                                    autoComplete="current-password" // Указываем, что это поле для текущего пароля
                                    value={this.state.password} // Связывает значение поля с состоянием this.state.password
                                    onChange={this.handlePasswordChange} // Обновляет состояние password при изменении текста в поле через метод handlePasswordChange
                                    placeholder="Введите пароль" // Задает placeholder (подсказку), отображаемую, когда поле пустое
                                    disabled={this.state.loading} // Отключает поле ввода, если идет загрузка (this.state.loading = true)
                                    className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${this.state.loading ? 'bg-gray-200 cursor-not-allowed' : ''}`} // Применяет стили Tailwind: отступ сверху, полная ширина, отступы внутри, граница, закругленные углы, убирает стандартный контур при фокусе, добавляет синий ободок при фокусе, а также условно затемняет фон и меняет курсор при загрузке
                                />
                            </label> // Закрывает метку для пароля
                        </div> // Закрывает группу для пароля
                        {this.state.error && ( // Условно отображает сообщение об ошибке, если this.state.error не пустое, с красным цветом и отступом снизу
                            <p className="text-red-500 mb-4">{this.state.error}</p>
                        )}
                        <button
                            type="submit" // Устанавливает тип кнопки как submit, чтобы отправлять форму
                            disabled={this.state.loading} // Отключает кнопку, если идет загрузка (this.state.loading = true)
                            className={`w-full p-3 rounded-lg text-white font-semibold transition-colors ${this.state.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`} // Применяет стили Tailwind: полная ширина, отступы внутри, закругленные углы, белый текст, жирный шрифт, плавный переход цвета, а также условно меняет фон и курсор в зависимости от состояния загрузки
                        >
                            {this.state.loading ? 'Загрузка...' : 'Войти'} // Условно отображает текст "Загрузка..." или "Войти" в зависимости от состояния загрузки
                        </button> // Закрывает кнопку
                    </form> // Закрывает форму
                </div> // Закрывает внутренний контейнер
            </div> // Закрывает внешний контейнер
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
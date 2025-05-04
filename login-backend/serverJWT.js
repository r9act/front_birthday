const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Настройка CORS для фронтенда на localhost:3000
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Парсинг JSON
app.use(express.json());

// Секретный ключ для подписи JWT
const JWT_SECRET = 'your-very-secure-secret-key'; // В продакшене храните в .env

// Имитация базы данных пользователей
const users = [
    {
        username: 'developer',
        password: 'developer',
        roles: ['ROLE_USER', 'ROLE_DEVELOPER'],
    },
    {
        username: 'user',
        password: 'user',
        roles: ['ROLE_USER'],
    },
];

// Эндпоинт для логина
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Проверка логина и пароля
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Неверный логин или пароль',
        });
    }

    // Генерация JWT
    const token = jwt.sign(
        {
            sub: user.username,
            roles: user.roles,
        },
        JWT_SECRET,
        { expiresIn: '24h' } // Токен истекает через 24 часа
    );

    res.json({
        success: true,
        token,
    });
});

// Middleware для проверки JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized',
            message: 'Токен отсутствует или неверный формат',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Сохраняем данные пользователя (sub, roles) в req.user
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized',
            message: 'Недействительный или истекший токен',
        });
    }
};

// Middleware для проверки ролей
const checkRoles = (requiredRoles) => (req, res, next) => {
    const userRoles = req.user.roles || [];

    const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRequiredRole) {
        return res.status(403).json({
            status: 403,
            error: 'Forbidden',
            message: 'Недостаточно прав для доступа',
        });
    }

    next();
};

// Эндпоинт для работы с днями рождения
app.get('/api/birthdays/:foreignId', authenticateJWT, checkRoles(['ROLE_USER', 'ROLE_DEVELOPER']), (req, res) => {
    const { foreignId } = req.params;

    // Проверка, что пользователь запрашивает свои данные
    if (req.user.sub !== foreignId) {
        return res.status(403).json({
            status: 403,
            error: 'Forbidden',
            message: 'Доступ разрешен только к собственным данным',
        });
    }

    // Имитация данных
    const birthdays = [
        { name: 'John', date: '1990-01-01' },
        { name: 'Jane', date: '1995-02-15' },
    ];

    res.json(birthdays);
});

app.post('/api/birthdays/:foreignId', authenticateJWT, checkRoles(['ROLE_USER', 'ROLE_DEVELOPER']), (req, res) => {
    const { foreignId } = req.params;
    const birthdayData = req.body;

    // Проверка, что пользователь добавляет свои данные
    if (req.user.sub !== foreignId) {
        return res.status(403).json({
            status: 403,
            error: 'Forbidden',
            message: 'Доступ разрешен только для собственных данных',
        });
    }

    // Имитация сохранения данных
    console.log('Saving birthdays for', foreignId, ':', birthdayData);
    res.json({ success: true });
});

// Эндпоинт для управления пользователями (только для ROLE_DEVELOPER)
app.get('/api/users', authenticateJWT, checkRoles(['ROLE_DEVELOPER']), (req, res) => {
    // Возвращаем список пользователей (без паролей)
    const userList = users.map(({ username, roles }) => ({ username, roles }));
    res.json(userList);
});

app.listen(8080, () => {
    console.log('Сервер запущен на http://localhost:8080');
});
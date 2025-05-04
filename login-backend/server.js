const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'developer' && password === 'developer') {
        res.json({
            success: true,
            token: 'fake-jwt-token-123',
        });
    } else {
        res.json({
            success: false,
            message: 'Неверный логин или пароль',
        });
    }
});

app.listen(8081, () => {
    console.log('Сервер запущен на http://localhost:8080');
});
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import UserManager from './pages/UserManager';
import BirthdayManager from './pages/BirthdayManager';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/users" element={<UserManager />} />
                <Route path="/birthdays" element={<BirthdayManager />} />
            </Routes>
        </Router>
    );
}

export default App;
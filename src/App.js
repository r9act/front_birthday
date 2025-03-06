import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import UserManager from './components/UserManager';
import BirthdayManager from './components/BirthdayManager';

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
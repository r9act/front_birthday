import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import UserManager from './pages/UserManager';
import BirthdayManager from './pages/BirthdayManager';
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/birthdays"
                    element={
                        <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_DEVELOPER']}>
                            <BirthdayManager />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute requiredRoles={['ROLE_DEVELOPER']}>
                            <UserManager />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
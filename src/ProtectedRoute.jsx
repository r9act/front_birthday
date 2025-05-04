import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

/**
 * Компонент для проверки ролей
 * @param children
 * @param requiredRoles
 * @returns {*|JSX.Element}
 * @constructor
 */
const ProtectedRoute = ({ children, requiredRoles }) => {
    const token = localStorage.getItem('token');

    // Проверяем, есть ли токен
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        // Декодируем токен и извлекаем роли
        const decoded = jwtDecode(token);
        const userRoles = decoded.roles || [];

        // Проверяем, есть ли хотя бы одна из требуемых ролей
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRequiredRole) {
            return <Navigate to="/home" replace />;
        }

        return children;
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
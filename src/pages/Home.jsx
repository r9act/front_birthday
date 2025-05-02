import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Статус-бар */}
            <div className="bg-blue-600 text-white p-2 text-center fixed top-0 left-0 w-full z-10 shadow-md">
                <h2 className="text-lg font-semibold">Birthday Manager</h2>
            </div>

            {/* Контент с отступом для статус-бара */}
            <div className="pt-10"> {/* Отступ сверху, чтобы контент не перекрывался */}
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                        <div className="space-y-4">
                            <Link to="/users">
                                <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
                                    Управлять пользователями
                                </button>
                            </Link>
                            <Link to="/birthdays">
                                <button className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition">
                                    Управлять днями рождения
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';


// Імпорт твоїх компонентів
import Timeline from './components/Timeline';
import Quiz from './components/Quiz';
import Feedback from './components/Feedback';
import Auth from './components/Auth';
import './style.css';

// Головна сторінка, яку бачать усі
const HomePage = () => (
    <section className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1>Вітаємо у MyHistoryZNOHub!</h1>
        <p>Ваш інтерактивний провідник у світ історії України.</p>
        <div style={{ marginTop: '30px' }}>
            <Link to="/events" className="btn-primary" style={{ textDecoration: 'none' }}>Почати подорож</Link>
        </div>
    </section>
);

// Компонент для захисту сторінок
const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        // Якщо не залогінений — відправляємо на вхід
        return <Navigate to="/auth" replace />;
    }
    return children;
};

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <div className="container">Завантаження...</div>;

    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <header>
                    <div className="container header-content">
                        <div className="logo"><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>MyHistoryZNOHub</Link></div>
                        <nav>
                            <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
                                <li><Link to="/">Головна</Link></li>
                                <li><Link to="/events">Події</Link></li>
                                <li><Link to="/quiz">Тест</Link></li>
                                <li><Link to="/feedback">Відгуки</Link></li>
                                <li><Link to="/auth" style={{ color: '#e67e22' }}>{user ? 'Профіль' : 'Вхід'}</Link></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <main style={{ flex: 1 }}>
                    <Routes>
                        {/* 🟢 ПУБЛІЧНІ МАРШРУТИ (Доступні абсолютно всім) */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<Auth user={user} />} />
                        
                        {/* ОЦЕЙ РЯДОК МИ ЗМІНИЛИ: тепер Хронологія публічна */}
                        <Route path="/events" element={<Timeline />} /> 
                        

                        {/* 🔴 ЗАХИЩЕНІ МАРШРУТИ (Перекинуть на сторінку входу, якщо немає user) */}
                        <Route path="/quiz" element={
                            <ProtectedRoute user={user}>
                                <Quiz />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/feedback" element={
                            <ProtectedRoute user={user}>
                                <Feedback user={user} />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </main>

                <footer>
                    <div className="container footer-content">
                        <p>&copy; 2026 MyHistoryZNOHub. Vladyslav Pysmak!</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
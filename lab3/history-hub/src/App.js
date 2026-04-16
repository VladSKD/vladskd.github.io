import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Timeline from './components/Timeline';
import EventCard from './components/EventCard';
import Quiz from './components/Quiz';
import Feedback from './components/Feedback'; 
import './style.css'; 

const EventsPage = () => (
    <section className="container events-grid">
        <EventCard 
            title="Хрещення Русі" 
            imgUrl="/fotoone.jpg" 
            description="Прийняття християнства князем Володимиром Великим." 
        />
        <EventCard 
            title="Незалежність України" 
            imgUrl="/fototwo.jpg" 
            description="24 серпня 1991 року ухвалено Акт проголошення незалежності." 
        />
    </section>
);

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <header>
                    <div className="container header-content">
                        <div className="logo">MyHistoryZNOHub</div>
                        <nav>
                            <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
                                <li><Link to="/">Хронологія</Link></li>
                                <li><Link to="/events">Події</Link></li>
                                <li><Link to="/quiz">Тест</Link></li>
                                <li><Link to="/feedback">Відгуки</Link></li> {/* Повернули лінк */}
                            </ul>
                        </nav>
                    </div>
                </header>

                <main style={{ padding: '20px 0', flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Timeline />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/feedback" element={<Feedback />} /> 
                    </Routes>
                </main>

               
                <footer>
                    <div className="container footer-content">
                        <p>&copy; 2026 MyHistoryZNOHub. Всі права захищені.</p>
                        <p>Контакти: vladyslav.pysmak.oi.2024@lpnu.ua | +380 50 597 35 62</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
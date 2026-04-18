import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Quiz({ user }) {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Нові стани для середньої оцінки з бекенду
    const [averageScore, setAverageScore] = useState(0);
    const [testsTaken, setTestsTaken] = useState(0);

    // 1. Функція для отримання середньої оцінки з нашого Node.js сервера (GET-запит)
    const fetchAverage = async () => {
        if (!user) return;
        try {
            const response = await fetch(`https://history-api-nulp.onrender.com/api/scores/average/${user.uid}`);
            const data = await response.json();
            setAverageScore(data.average);
            setTestsTaken(data.testsTaken);
        } catch (error) {
            console.error("Помилка завантаження середньої оцінки:", error);
        }
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "quiz"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuestions(data);
                setLoading(false);
            } catch (error) {
                console.error("Помилка завантаження тесту: ", error);
                setLoading(false);
            }
        };
        fetchQuiz();
        fetchAverage(); // Викликаємо завантаження середньої оцінки при відкритті сторінки
    }, [user]);

    // 2. Відправка результатів на наш Node.js сервер (POST-запит)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentScore = 0;
        const formData = new FormData(e.target);
        
        questions.forEach((q) => {
            if (formData.get(q.id) === q.correctAnswer) {
                currentScore += 1;
            }
        });

        // Замість збереження тільки локально, відправляємо на бекенд
        try {
            await fetch('https://history-api-nulp.onrender.com/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid,
                    score: currentScore,
                    totalQuestions: questions.length
                })
            });
            
            setScore(currentScore);
            fetchAverage(); // Оновлюємо статистику зверху після проходження
            
        } catch (error) {
            console.error("Помилка відправки результатів:", error);
            alert("Не вдалося зберегти результати. Перевірте, чи працює сервер.");
        }
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', padding: '50px' }}>Завантаження тесту...</div>;
    if (questions.length === 0) return <div className="container" style={{ textAlign: 'center', padding: '50px' }}>Тести ще не додані!</div>;

    return (
        <section className="container">
            {/* ВАРІАНТ 15: Відображення середньої оцінки зверху сторінки */}
            <div style={{ background: '#3498db', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: 0 }}>📊 Твоя статистика</h3>
                <p style={{ margin: '5px 0 0 0' }}>
                    Пройдено тестів: <strong>{testsTaken}</strong> | Середня оцінка: <strong>{averageScore}</strong> з {questions.length}
                </p>
            </div>

            <h2>Перевір свої знання</h2>
            <form onSubmit={handleSubmit} className="quiz-form">
                {questions.map((q, index) => (
                    <div key={q.id} className="question" style={{ marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <p><strong>{index + 1}. {q.question}</strong></p>
                        {q.options && q.options.map((option, idx) => (
                            <label key={idx} style={{ display: 'block', margin: '8px 0', cursor: 'pointer' }}>
                                <input type="radio" name={q.id} value={option} required style={{ marginRight: '10px' }} />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit" className="btn-submit" style={{ marginTop: '15px' }}>Завершити тест</button>
            </form>

            {score !== null && (
                <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', background: '#eafaf1', borderRadius: '8px' }}>
                    <h3>Останній результат: {score} з {questions.length}</h3>
                    <p style={{ color: '#27ae60', fontWeight: 'bold' }}>✅ Результат успішно збережено на сервері!</p>
                </div>
            )}
        </section>
    );
}

export default Quiz;
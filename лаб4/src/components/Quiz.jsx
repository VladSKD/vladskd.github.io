import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                // Завантажуємо питання з Firebase
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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let currentScore = 0;
        const formData = new FormData(e.target);
        
        // Звіряємо відповіді з базою
        questions.forEach((q) => {
            if (formData.get(q.id) === q.correctAnswer) {
                currentScore += 1;
            }
        });
        
        setScore(currentScore);
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', padding: '50px' }}>Завантаження тесту з хмари...</div>;
    
    if (questions.length === 0) return <div className="container" style={{ textAlign: 'center', padding: '50px' }}>Тести ще не додані у Firebase!</div>;

    return (
        <section className="container">
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
                    <h3>Твій результат: {score} з {questions.length}</h3>
                    <div style={{ background: '#ddd', width: '100%', height: '20px', borderRadius: '10px', overflow: 'hidden', marginTop: '10px' }}>
                        <div style={{ 
                            background: '#27ae60', 
                            width: `${(score / questions.length) * 100}%`, 
                            height: '100%', 
                            transition: 'width 0.5s ease-in-out'
                        }}></div>
                    </div>
                    <p style={{ marginTop: '10px' }}>Графік прогресу: {Math.round((score / questions.length) * 100)}% засвоєння</p>
                </div>
            )}
        </section>
    );
}

export default Quiz;
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            const querySnapshot = await getDocs(collection(db, "quiz"));
            setQuestions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        };
        fetchQuiz();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let currentScore = 0;
        const formData = new FormData(e.target);
        
        questions.forEach((q) => {
            if (formData.get(q.id) === q.correctAnswer) {
                currentScore += 1;
            }
        });
        
        setScore(currentScore);
    };

    if (loading) return <div className="container">Завантаження тесту...</div>;

    return (
        <section className="container">
            <h2>Перевір свої знання</h2>
            <form onSubmit={handleSubmit} className="quiz-form">
                {questions.map((q) => (
                    <div key={q.id} className="question" style={{ marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '8px' }}>
                        <p><strong>{q.question}</strong></p>
                        {q.options.map((option, idx) => (
                            <label key={idx} style={{ display: 'block', margin: '5px 0', cursor: 'pointer' }}>
                                <input type="radio" name={q.id} value={option} required style={{ marginRight: '10px' }} />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit" className="btn-submit">Завершити тест</button>
            </form>

            {score !== null && (
                <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', background: '#eafaf1', borderRadius: '8px' }}>
                    <h3>Твій результат: {score} з {questions.length}</h3>
                </div>
            )}
        </section>
    );
}

export default Quiz;
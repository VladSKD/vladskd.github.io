import React, { useState } from 'react';

function Quiz() {
    const [score, setScore] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let currentScore = 0;
        const form = new FormData(e.target);
        
        if (form.get('q1') === '1991') currentScore += 1;
        if (form.get('q2') === 'volodymyr') currentScore += 1;
        
        setScore(currentScore);
    };

    return (
        <section className="container">
            <h2>Перевір свої знання</h2>
            <form onSubmit={handleSubmit} className="quiz-form">
                <div className="question">
                    <p>1. У якому році було проголошено незалежність України?</p>
                    <label><input type="radio" name="q1" value="1990" /> 1990</label>
                    <label><input type="radio" name="q1" value="1991" /> 1991</label>
                </div>
                <div className="question">
                    <p>2. Хто хрестив Київську Русь?</p>
                    <label><input type="radio" name="q2" value="volodymyr" /> Володимир Великий</label>
                    <label><input type="radio" name="q2" value="yaroslav" /> Ярослав Мудрий</label>
                </div>
                <button type="submit" className="btn-submit">Завершити тест</button>
            </form>

            {score !== null && (
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <h3>Твій результат: {score} з 2</h3>
                    <div style={{ background: '#ddd', width: '100%', height: '20px', borderRadius: '10px' }}>
                        <div style={{ 
                            background: '#27ae60', 
                            width: `${(score / 2) * 100}%`, 
                            height: '100%', 
                            borderRadius: '10px',
                            transition: 'width 0.5s'
                        }}></div>
                    </div>
                    <p>Графік прогресу: {(score / 2) * 100}% засвоєння</p>
                </div>
            )}
        </section>
    );
}

export default Quiz;
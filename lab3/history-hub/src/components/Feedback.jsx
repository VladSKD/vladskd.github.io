import React, { useState } from 'react';

function Feedback() {
    // Стан для списку відгуків
    const [feedbacks, setFeedbacks] = useState([]);
    // Стани для полів форми
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if (name.trim() === '' || comment.trim() === '') {
            alert('Будь ласка, заповніть усі поля форми!');
            return;
        }

        // Додаємо новий відгук до масиву
        const newFeedback = { name, comment };
        setFeedbacks([...feedbacks, newFeedback]);
        
        // Очищаємо форму
        setName('');
        setComment('');
    };

    return (
        <section id="feedback" className="container" style={{ marginBottom: '40px' }}>
            <h2>Залиште свій відгук про історичну подію</h2>
            <form onSubmit={handleSubmit} className="quiz-form">
                <div className="question">
                    <label htmlFor="name-input">Ваше ім'я:</label>
                    <input 
                        type="text" 
                        id="name-input" 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="question">
                    <label htmlFor="comment-input">Коментар:</label>
                    <textarea 
                        id="comment-input" 
                        rows="3" 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn-submit">Надіслати</button>
            </form>
            
            {/* Виведення списку відгуків */}
            <div id="feedback-list" style={{ marginTop: '20px' }}>
                {feedbacks.map((item, index) => (
                    <div key={index} className="feedback-item">
                        <strong>{item.name}</strong>: <p>{item.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Feedback;
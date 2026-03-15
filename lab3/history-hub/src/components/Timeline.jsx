import React, { useState } from 'react';
import { historicalEvents } from '../data';

function Timeline() {
    const [filter, setFilter] = useState('Всі');

    const periods = ['Всі', 'Середньовіччя', 'Новий час', 'Новітній час'];
    
    const filteredEvents = filter === 'Всі' 
        ? historicalEvents 
        : historicalEvents.filter(event => event.period === filter);

    return (
        <section className="container">
            <h2>Хронологія подій</h2>
            <div style={{ marginBottom: '20px' }}>
                {periods.map(period => (
                    <button 
                        key={period} 
                        onClick={() => setFilter(period)}
                        style={{ marginRight: '10px', backgroundColor: filter === period ? '#e67e22' : '#2c3e50' }}
                    >
                        {period}
                    </button>
                ))}
            </div>
            
            <div className="timeline-wrapper">
                {filteredEvents.map(event => (
                    <div key={event.id} className="timeline-item">
                        <span className="date">{event.year} рік</span>
                        <span className="event">{event.title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Timeline;
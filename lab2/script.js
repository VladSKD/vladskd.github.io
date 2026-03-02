document.addEventListener('DOMContentLoaded', () => {
    const historicalEvents = [
        { year: 988, title: "Хрещення Русі", details: "Прийняття християнства як державної релігії князем Володимиром Великим, що визначило цивілізаційний вектор розвитку." },
        { year: 1596, title: "Утворення УГКЦ", details: "Берестейська унія, що об'єднала частину православної церкви з католицькою під зверхністю Папи Римського." },
        { year: 1648, title: "Козацька революція", details: "Початок Національно-визвольної війни під проводом Богдана Хмельницького проти Речі Посполитої." },
        { year: 1991, title: "Незалежність України", details: "24 серпня 1991 року Верховна Рада УРСР ухвалила Акт проголошення незалежності України." }
    ];

    const timelineContainer = document.getElementById('dynamic-timeline');
    let i = 0;
    
    while (i < historicalEvents.length) {
        const event = historicalEvents[i];
        const itemDiv = document.createElement('div');
        itemDiv.className = 'timeline-item';
        
        itemDiv.innerHTML = `
            <span class="date">${event.year} рік</span>
            <span class="event">${event.title}</span>
            <button class="learn-more-btn" data-index="${i}">Дізнатися більше</button>
        `;
        timelineContainer.appendChild(itemDiv);
        i++;
    }

    const timelineItems = document.querySelectorAll('.timeline-item');
    for (let j = 0; j < timelineItems.length; j++) {
        if (historicalEvents[j].year > 1900) {
            timelineItems[j].style.borderColor = "#27ae60";
        }
    }

    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            modalTitle.textContent = historicalEvents[index].title;
            modalDesc.textContent = historicalEvents[index].details;
            modal.style.display = 'flex'; 
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none'; 
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const testSection = document.getElementById('testing');
    const toggleTestBtn = document.getElementById('toggle-test-btn');
    
    testSection.style.display = 'none';

    toggleTestBtn.addEventListener('click', () => {
        if (testSection.style.display === 'none' || testSection.style.display === '') {
            testSection.style.display = 'block';
            toggleTestBtn.textContent = 'Приховати тест';
        } else {
            testSection.style.display = 'none';
            toggleTestBtn.textContent = 'Тест';
        }
    });

    const eventCards = document.querySelectorAll('.event-card');
    for (let k = 0; k < eventCards.length; k++) {
        eventCards[k].addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.backgroundColor = '#fdf5e6'; 
        });
        eventCards[k].addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'var(--white)';
        });
    }

    const feedbackForm = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');
    const feedbackList = document.getElementById('feedback-list');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const nameVal = nameInput.value.trim();
        const commentVal = commentInput.value.trim();

        if (nameVal === '' || commentVal === '') {
            alert('Будь ласка, заповніть усі поля форми!');
        } else {
            const newComment = document.createElement('div');
            newComment.className = 'feedback-item';
            newComment.innerHTML = `<strong>${nameVal}</strong>: <p>${commentVal}</p>`;
            
            feedbackList.appendChild(newComment);
            
            nameInput.value = '';
            commentInput.value = '';
        }
    });
    const submitTestBtn = document.querySelector('#testing .btn-submit');
    
    if (submitTestBtn) {
        submitTestBtn.addEventListener('click', (e) => {
            e.preventDefault(); 

            let score = 0;
            const q1Answer = document.querySelector('input[name="q1"]:checked');
            const q2Answer = document.querySelector('input[name="q2"]:checked');

            const q1Div = document.querySelectorAll('#testing .question')[0];
            const q2Div = document.querySelectorAll('#testing .question')[1];

            if (q1Answer) {
                if (q1Answer.value === "1991") {
                    q1Div.style.border = "2px solid #27ae60"; 
                    q1Div.style.backgroundColor = "#eafaf1"; 
                    score++;
                } else {
                    q1Div.style.border = "2px solid #e74c3c"; 
                    q1Div.style.backgroundColor = "#fdedec";
                }
            } else {
                q1Div.style.border = "2px solid #e74c3c"; 
            }

            if (q2Answer) {
                if (q2Answer.value === "volodymyr") {
                    q2Div.style.border = "2px solid #27ae60";
                    q2Div.style.backgroundColor = "#eafaf1";
                    score++;
                } else {
                    q2Div.style.border = "2px solid #e74c3c";
                    q2Div.style.backgroundColor = "#fdedec";
                }
            } else {
                q2Div.style.border = "2px solid #e74c3c";
            }

            let resultMsg = document.getElementById('test-result-msg');
            if (!resultMsg) {
                resultMsg = document.createElement('h3');
                resultMsg.id = 'test-result-msg';
                document.querySelector('#testing .quiz-form').appendChild(resultMsg);
            }
            
            resultMsg.textContent = `Твій результат: ${score} з 2`;
            resultMsg.style.textAlign = 'center';
            resultMsg.style.marginTop = '20px';
            resultMsg.style.color = score === 2 ? '#27ae60' : '#e67e22'; 
        });
    }
});
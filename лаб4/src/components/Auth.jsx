import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Auth({ user }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = userCredential.user;

                const fullName = `${firstName} ${lastName}`;
                await updateProfile(newUser, { displayName: fullName });

                await setDoc(doc(db, "users", newUser.uid), {
                    firstName,
                    lastName,
                    phone,
                    email
                });

                alert('Вітаємо! Реєстрація пройшла успішно.');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            alert('Помилка: ' + error.message);
        }
    };

    if (user) {
        return (
            <section className="container" style={{ textAlign: 'center', marginTop: '40px' }}>
                <h2>Особистий кабінет</h2>
                <p>Вітаємо, <strong>{user.displayName || 'Користувач'}</strong>!</p>
                <p>Ваша пошта: {user.email}</p>
                <button className="btn-submit" onClick={() => signOut(auth)}>Вийти</button>
            </section>
        );
    }

    return (
        <section className="container" style={{ marginTop: '40px', maxWidth: '500px' }}>
            <h2>{isRegistering ? 'Створити профіль' : 'Вхід'}</h2>
            <form onSubmit={handleAuth} className="quiz-form">
                {isRegistering && (
                    <>
                        <div className="question">
                            <label>Ім'я:</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="question">
                            <label>Прізвище:</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className="question">
                            <label>Номер телефону:</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+380..." required />
                        </div>
                    </>
                )}
                <div className="question">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="question">
                    <label>Пароль (від 6 символів):</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-submit" style={{ width: '100%' }}>
                    {isRegistering ? 'Зареєструватися' : 'Увійти'}
                </button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)} style={{ background: 'none', border: 'none', color: '#e67e22', cursor: 'pointer', display: 'block', margin: '15px auto' }}>
                {isRegistering ? 'Вже маєте акаунт?' : 'Немає акаунту? Створіть його зараз'}
            </button>
        </section>
    );
}

export default Auth;
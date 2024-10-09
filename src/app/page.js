'use client';

import { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import RegisterForm from './components/RegisterForm';
import QuoteForm from './components/QuoteForm';
import QuoteList from './components/QuoteList';
import jwt from 'jsonwebtoken';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    setQuotes(storedQuotes);

    const token = localStorage.getItem('token');
    
    if (token) {
      fetch('/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          const decoded = jwt.decode(data.token);
          setUser(decoded.username);
        }
      })
      .catch(error => console.error("Ошибка при обновлении токена:", error));
    }
  }, []);

  const addQuote = (quoteText) => {
    const updatedQuotes = [...quotes, { text: quoteText, author: user }];
    setQuotes(updatedQuotes);
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {!user ? (
          <>
            <AuthForm setUser={setUser} />
            <RegisterForm setUser={setUser} />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center align-middle mb-4">
              <h2 className="text-xl text-white">Добро пожаловать, {user}!</h2>
              <button onClick={handleLogout} className="flex items-center bg-transparent text-white hover:text-grey-400 transition duration-200">
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Выйти
              </button>
            </div>
            <QuoteForm addQuote={addQuote} />
            <QuoteList quotes={quotes} setQuotes={setQuotes} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
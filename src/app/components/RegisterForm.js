'use client';

import { useState } from 'react';

const RegisterForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(username);
    } else {
      alert('Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleRegister} className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-coral mb-4">Регистрация</h2>
      <input 
        type="text" 
        placeholder="Имя пользователя" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        className="border border-gray-300 rounded p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-coral transition duration-200"
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="border border-gray-300 rounded p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-coral transition duration-200"
      />
      <button type="submit" className="bg-coral text-white p-3 rounded w-full hover:bg-lightCoral transition duration-200">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;
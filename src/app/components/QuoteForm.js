'use client'; 
import { useState } from 'react';

const QuoteForm = ({ addQuote }) => {
  const [quoteText, setQuoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuote(quoteText);
    setQuoteText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-5">
      <input 
        type="text" 
        placeholder="Добавьте новую цитату" 
        value={quoteText} 
        onChange={(e) => setQuoteText(e.target.value)} 
        className="border border-gray-700 rounded p-3 w-full mb-4 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral transition duration-200"
      />
      <button type="submit" className="bg-coral text-white p-3 rounded w-full hover:bg-lightCoral transition duration-200">Добавить цитату</button>
    </form>
  );
};

export default QuoteForm;
// src/components/QuoteList.js

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const QuoteList = ({ quotes, setQuotes }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditText(quotes[index].text);
  };

  const handleUpdate = (index) => {
    const updatedQuotes = [...quotes];
    updatedQuotes[index].text = editText;
    setQuotes(updatedQuotes);
    setIsEditing(null);
    setEditText('');
  };

  const handleDelete = (index) => {
    const updatedQuotes = quotes.filter((_, i) => i !== index);
    setQuotes(updatedQuotes);
  };

  return (
    <ul className="mt-4 space-y-2">
      {quotes.map((quote, index) => (
        <li key={index} className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex justify-between items-center">
          {isEditing === index ? (
            <>
              <input 
                type="text" 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)} 
                className="border border-gray-700 rounded p-2 bg-gray-900 text-white w-full mr-2"
              />
              <button onClick={() => handleUpdate(index)} className="bg-coral text-white p-2 rounded hover:bg-lightCoral transition duration-200">Сохранить</button>
            </>
          ) : (
            <>
              <div>
                <strong className="text-teal">{quote.author}:</strong> <span className="text-gray-200">{quote.text}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(index)}>
                  <PencilIcon className="h-5 w-5 text-teal hover:fill-white transition duration-200" />
                </button>
                <button onClick={() => handleDelete(index)}>
                  <TrashIcon className="h-5 w-5 text-red-600 hover:fill-white transition duration-200" />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default QuoteList;
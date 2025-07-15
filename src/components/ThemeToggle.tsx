import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-lg transition-colors ${theme === 'light'
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-yellow-400 text-gray-800 hover:bg-yellow-300'
        }`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}; 
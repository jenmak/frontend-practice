import React, { ChangeEvent } from 'react';
import { useUserStore } from '../store/userStore';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useUserStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}; 
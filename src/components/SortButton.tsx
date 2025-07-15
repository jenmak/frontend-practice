import React from 'react';
import { useUserStore } from '../store/userStore';

export const SortButton: React.FC = () => {
  const { sortOrder, sortUsers } = useUserStore();

  const getButtonText = () => {
    switch (sortOrder) {
      case 'asc':
        return 'Sort Descending';
      case 'desc':
        return 'Sort Ascending';
      default:
        return 'Sort Alphabetically';
    }
  };

  return (
    <button
      onClick={sortUsers}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      {getButtonText()}
    </button>
  );
}; 
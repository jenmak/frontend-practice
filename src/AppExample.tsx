import React, { useEffect } from "react";
import { useUserStore } from "./store/userStore";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { UserList } from "./components/UserList";
import { SearchBar } from "./components/SearchBar";
import { SortButton } from "./components/SortButton";
import { ThemeToggle } from "./components/ThemeToggle";

function AppContent() {
  const { theme } = useTheme();
  const { fetchUsers, clearError } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={`min-h-screen transition-colors ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-white'
      }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
            User Directory
          </h1>
          <ThemeToggle />
        </div>

        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="mb-6">
          <SortButton />
        </div>

        <UserList />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
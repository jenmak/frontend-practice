import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type User = {
  address: any;
  company: any;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortOrder: 'asc' | 'desc' | null;

  // Actions
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (searchTerm: string) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc' | null) => void;
  fetchUsers: () => Promise<void>;
  sortUsers: () => void;
  clearError: () => void;

  // Computed values
  filteredUsers: User[];
}

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      users: [],
      loading: false,
      error: null,
      searchTerm: '',
      sortOrder: null,

      setUsers: (users) => set({ users }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSortOrder: (sortOrder) => set({ sortOrder }),

      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) throw new Error('Failed to fetch users');
          const data = await response.json();
          set({ users: data, loading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            loading: false
          });
        }
      },

      sortUsers: () => {
        const { users, sortOrder } = get();
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sorted = [...users].sort((a, b) => {
          const comparison = a.name.localeCompare(b.name);
          return newSortOrder === 'asc' ? comparison : -comparison;
        });
        set({ users: sorted, sortOrder: newSortOrder });
      },

      clearError: () => set({ error: null }),

      get filteredUsers() {
        const { users, searchTerm } = get();
        return users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      },
    }),
    {
      name: 'user-store',
    }
  )
) 
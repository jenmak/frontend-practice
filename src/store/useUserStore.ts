import { create } from 'zustand'

type User = {
  address: any;
  company: any;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

type UserStore = {
  users: User[]
  loading: boolean
  error: string
  searchTerm: string
  page: number,
  totalPages: number
  setUsers: (users: User[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string) => void
  setSearchTerm: (term: string) => void
  fetchUsers: (page?: number) => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  loading: true,
  error: '',
  searchTerm: '',
  page: 1,
  totalPages: 10,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchTerm: (term) => set({ searchTerm: term}),
  fetchUsers: async (page = get().page) => {
    set({ loading: true, error: ''})
    try {
      const res = await fetch (`/api/users?page=${page}&limit=10`)
      const data = await res.json()
    } catch (err: any) {
      set({ error: 'Failed to fetch users', loading: false})
    }
  }
}))
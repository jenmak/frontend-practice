import { createContext, ReactNode, useContext, useState } from "react"
import { User } from "../store/userStoreExample"

export type UserContextType = {
  users: User[]
  loading: boolean
  error: string
  searchTerm: string
  setUsers: (users: User[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string) => void
  setSearchTerm: (term: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        searchTerm,
        setUsers,
        setLoading,
        setError,
        setSearchTerm
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvideer')
  }
  return context
}
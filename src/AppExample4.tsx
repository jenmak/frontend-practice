import React, { useEffect, useState } from "react"
import { useUserStore } from "./store/userStoreExample";

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

function App() {

  const { users, setUsers, loading, setLoading, error, setError, searchTerm, setSearchTerm } = useUserStore()

  const handleSearchTermChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = () => {
    const sortedUsers = [...users].sort((a: User, b:User) => a.name.localeCompare(b.name))
    setUsers(sortedUsers)
  }
  
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then((res) => {
      if (!res.ok) throw new Error('Invalid response')
      return res.json()
    }).then((data) => {
      setUsers(data);
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      setError(error);
      throw new Error('Error: ' + error)
    })
  }, [])

  if (error) {
    return <>Error: {error}</>
  }

  if (loading) {
    return <>Loading...</>
  }
  
  return(
    <>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <button onClick={handleSort}>Sort A-Z</button>
    
      {filteredUsers.map((user) => (
        <div>{user.name}</div>
      ))
    }
    
    </>
  )
}

export default App
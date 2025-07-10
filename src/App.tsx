import React, { useEffect, useState } from "react"

// https://jsonplaceholder.typicode.com/users

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

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then((res) => {
      if (!res.ok) console.log('Request denied:' + res.status);
      return res.json()
    }).then((body) => {
      setUsers(body);
      setLoading(false);
    }).catch((err) => {
      setError(err)
      setLoading(false)
    })

  }, [])

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSortAlphabetically = () => {
    const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name))
    setUsers(sorted)
  }

  const handleSortReverseAlphabetically = () => {
    const sorted = [...users].sort((a, b) => b.name.localeCompare(a.name))
    setUsers(sorted)
  }

  if (error) {
    return <>Error: {error}</>
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <div>
      <>
        <button onClick={handleSortAlphabetically}>Sort A-Z</button>
        <button onClick={handleSortReverseAlphabetically}>Sort Z-A</button>
      </>
      <input
        type="text"
        placeholder="Search names"
        value={searchTerm}
        onChange={(value) => handleSearchTermChange(value)}
        />
      {filteredUsers.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  )
}

export default App
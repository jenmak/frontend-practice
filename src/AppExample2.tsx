// https://jsonplaceholder.typicode.com/users
import React, { useEffect, useState } from "react"

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

export default function App() {

  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then((res) => {
      if (!res.ok) console.log('Response denied')
      return res.json();
    }).then((data: User[]) =>{
      setUsers(data)
      setLoading(false);
    }).catch((error) => {
      setError(error)
    })

  }, [])

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  if (error) {
    return <>Error: {error }</>
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <div className="m-5">
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {filteredUsers.map((user, index) => (
        <div key={index} className="">
          <>{user.name}</>
          <>{user.username}</>
        </div>
      ))}
    </div>
  )

}


import React, { useEffect, useState } from 'react'
import {
  InfiniteLoader,
  List,
  Autosizer,
  IndexRange
} from 'react-virtualized'
import 'react-virtualized/styles.css'

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

type ApiResponse = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
}

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  const fetchUsers = async (page: number) {
    setLoading(true);
    setError('')
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}&per_page=4`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data: ApiResponse = await response.json();
      setUsers(data.data)
      setTotalPages(data.total_pages)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(page)
  }, [page])

  if (loading) {
    return <>Loading...</>
  }

  return (
    <div>
      <h2>User List Page {page}</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red'}}>{error}</p>}

      {/* List of users */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <img src={user.avatar} alt={user.first_name} width={50} height={50} style={{ borderRadius: '50%', marginRight: '1rem' }} />
            <div>{user.first_name} {user.last_name} — {user.email}</div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: '1rem' }}>
        <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Previous</button>
        <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  )
}
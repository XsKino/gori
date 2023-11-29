/* eslint-disable no-unused-vars */
'use client'
import React, { useState } from 'react'
import axios from 'axios'

const Page = () => {
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState([])

  const handleAddUser = async () => {
    const newUser = { name: username }
    const result = await axios.post('/api/user', newUser)
    console.log(result.data)
  }

  const handleGetUsers = async () => {
    const result = await axios.get('/api/user', { params: { name: username } })
    console.log(result.data)
  }

  const handleUpdateUser = async () => {
    const newValues = { name: username, newName: 'newName' }
    const result = await axios.put('/api/user', newValues, {
      params: { name: username }
    })
    console.log(result.data)
  }

  const handleDeleteUser = async () => {
    const result = await axios.delete('/api/user', {
      params: { name: username }
    })
    console.log(result.data)
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2'>
      <input
        type='text'
        value={username}
        onChange={e => setUsername(e.target.value)}
        className='px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600'
      />
      <button
        onClick={handleAddUser}
        className='px-4 py-2 mb-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>
        Agregar usuario
      </button>
      <button
        onClick={handleDeleteUser}
        className='px-4 py-2 mb-2 bg-red-600 text-white rounded-md hover:bg-red-700'>
        Borrar usuario
      </button>
      <button
        onClick={handleUpdateUser}
        className='px-4 py-2 mb-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700'>
        Actualizar usuario
      </button>
      <button
        onClick={handleGetUsers}
        className='px-4 py-2 mb-2 bg-green-600 text-white rounded-md hover:bg-green-700'>
        Obtener usuarios
      </button>
    </div>
  )
}

export default Page

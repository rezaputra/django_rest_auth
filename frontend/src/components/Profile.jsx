import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [jewAccess, setJewAccess] = useState('')
  const [jewRefresh, setJewRefresh] = useState('')
  const apiURL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const storedAccess = JSON.parse(localStorage.getItem('access')) || ''
    if (!storedAccess) {
      navigate('/login')
    } else {
      // Set the local state based on the stored values
      setJewAccess(storedAccess)
      setUser(JSON.parse(localStorage.getItem('user')) || {})
      setJewRefresh(JSON.parse(localStorage.getItem('refresh')) || '')

      // Call your function to get data here
      getSomeData()
    }
  }, [navigate])

  const getSomeData = async () => {
    try {
      const res = await axiosInstance.get(apiURL + 'profile/')
      if (res.status === 200) {
        console.log(res.data)
      } else {
        console.error('Unexpected status code:', res.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post(apiURL + 'logout/', {
        refresh_token: jewRefresh,
      })
      if (res.status === 204) {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('user')
        navigate('/login')
      } else {
        console.error('Logout failed. Unexpected response:', res)
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="container">
      <h2>Hi {user.name}</h2>
      <p>Welcome</p>
      <button
        onClick={handleLogout}
        className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </div>
  )
}

export default Profile

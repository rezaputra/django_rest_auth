import axios from 'axios'
import { jwtDecode } from 'jwt-decode' // Correct import
import dayjs from 'dayjs'

const token = localStorage.getItem('access')
  ? JSON.parse(localStorage.getItem('access'))
  : ''
const refresh_token = localStorage.getItem('refresh')
  ? JSON.parse(localStorage.getItem('refresh'))
  : ''

const apiURL = import.meta.env.VITE_API_URL
const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json', // Correct content-type header
    Authorization: token ? `Bearer ${token}` : null,
  },
})

axiosInstance.interceptors.request.use(async (req) => {
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
    const user = jwtDecode(token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) {
      return req
    }

    try {
      const res = await axios.post(apiURL + 'token/refresh/', {
        refresh: refresh_token,
      })
      if (res.status === 200) {
        localStorage.setItem('access', JSON.stringify(res.data.access))
        req.headers.Authorization = `Bearer ${res.data.access}`
        return req
      } else {
        throw new Error('Failed to refresh token')
      }
    } catch (error) {
      // Handle refresh token failure
      const logoutRes = await axios.post(apiURL + 'logout', {
        refresh_token: refresh_token,
      })
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('user')
      console.error('Error refreshing token:', error)
      throw error
    }
  }
})

export default axiosInstance

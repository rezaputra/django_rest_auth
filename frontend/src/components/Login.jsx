import React, { useState } from 'react'
import google from '../assets/google.svg'
import github from '../assets/github.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const apiURL = import.meta.env.VITE_API_URL

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const [error, setError] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = loginData

    if (!email || !password) {
      setError('Email or password are required')
    }

    setIsloading(true)
    const res = await axios.post(apiURL + 'login/', loginData)
    const response = res.data
    setIsloading(false)
    const user = {
      email: response.email,
      name: response.full_name,
    }
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('access', JSON.stringify(response.access_token))
      localStorage.setItem('refresh', JSON.stringify(response.refresh_token))
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="shadow-md p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-left text font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={handleOnChange}
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginData.password}
                  onChange={handleOnChange}
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex py-2">
              <button className="px-4 py-2 rounded-lg flex justify-center bg-slate-100 flex-1 mx-4 ">
                <p className="mx-2">Google </p>
                <img className="w-5" src={google} alt="Google Logo" />
              </button>
              <button className="px-4 py-2 flex justify-center rounded-lg bg-slate-100 flex-1 mx-4 ">
                <p className="mx-2">Github </p>
                <img className="w-5 h-5" src={github} alt="Google Logo" />
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

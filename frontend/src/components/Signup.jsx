import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleLogin } from 'react-google-login'
import google from '../assets/google.svg'
import github from '../assets/github.svg'

const initialFormState = {
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password2: '',
}

function Signup() {
  const navigate = useNavigate()

  const [formdata, setFormData] = useState(initialFormState)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const apiURL = import.meta.env.VITE_API_URL

  const { email, first_name, last_name, password, password2 } = formdata
  const handleSignInWithGoogle = async (response) => {
    console.log(response)
  }

  useEffect(() => {
    google.account.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleSignInWithGoogle,
    })
    google.account.id.renderButton(document.getElementById('signUpDiv'), {
      theme: 'outline',
      size: 'large',
      text: 'continou_with',
      shape: 'circle',
      width: '280',
    })
  })

  const handleOnChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !first_name || !last_name || !password || !password2) {
      setError('All fields are required')
    } else {
      setLoading(true)
      setError('') // Reset error state
      try {
        const res = await axios.post(apiURL + 'register/', formdata)
        const response = res.data
        if (res.status === 201) {
          navigate('/otp/verify', { state: { email: email } })
          // Assuming you have toast notification capability
          toast.success(response.message)
        }
      } catch (error) {
        setError('An error occurred. Please try again.') // Set error message on failure
        console.error('Error during form submission:', error)
      } finally {
        setLoading(false)
      }
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
          <p className="text-fuchsia-700">{error ? error : ''}</p>
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
                  value={email}
                  onChange={handleOnChange}
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-left text font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={first_name}
                  onChange={handleOnChange}
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-left text font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={last_name}
                  onChange={handleOnChange}
                  required
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleOnChange}
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  value={password2}
                  onChange={handleOnChange}
                  required
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <h4 className="font-bold">Or</h4>
            <div className="flex py-2">
              <div className="" id="signUpDiv"></div>
              {/* <button className="px-4 py-2 rounded-lg flex justify-center bg-slate-100 flex-1 mx-4 ">
                <p className="mx-2">Google </p>
                <img className="w-5" src={google} alt="Google Logo" />
              </button> */}
              <button className="px-4 py-2 flex justify-center rounded-lg bg-slate-100 flex-1 mx-4 ">
                <p className="mx-2">Github </p>
                <img className="w-5 h-5" src={github} alt="Google Logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const apiURL = import.meta.env.VITE_API_URL

  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''))
  const email =
    location.state && location.state.email ? location.state.email : ''

  const maskedEmail = useMemo(() => {
    if (!email) return ''
    const atIndex = email.indexOf('@')
    const masked =
      email.substring(0, Math.min(atIndex, 2)) +
      '*'.repeat(Math.max(0, atIndex - 2)) +
      email.substring(atIndex)
    return masked
  }, [email])

  useEffect(() => {
    if (!email) {
      navigate('/404')
    }
  }, [email, navigate])

  const handleInputOnChange = useCallback((index, value) => {
    setVerificationCode((prevCode) => {
      const updatedCode = [...prevCode]
      updatedCode[index] = value
      return updatedCode
    })
  }, [])

  const combinedCode = verificationCode.join('')

  const verifyCode = async () => {
    if (combinedCode.length === 6) {
      try {
        const response = await axios.post(apiURL + 'verified/', {
          otp: combinedCode,
        })
        if (response.status === 200) {
          navigate('/login')
          toast.success(response.data.message)
        }
      } catch (error) {
        // Handle error
        console.error('Verification failed:', error)
        toast.error('Verification failed. Please try again.')
      }
    }
  }

  useEffect(() => {
    verifyCode()
  }, [combinedCode])

  const handleVerification = (e) => {
    e.preventDefault()
    verifyCode()
  }

  return (
    <div className="mx-auto border max-w-sm mt-20 rounded">
      <div className="flex flex-col items-center justify-center text-center space-y-2 m-6">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {maskedEmail || ''}</p>
        </div>
      </div>
      <form className="shadow-md px-4 py-6" onSubmit={handleVerification}>
        <div className="flex justify-center gap-2 mb-6">
          {verificationCode.map((value, index) => (
            <input
              key={index}
              className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={value}
              onChange={(e) => handleInputOnChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Verify
          </button>
          <Link
            to="#"
            className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800 ml-4"
          >
            Resend OTP
          </Link>
        </div>
      </form>
    </div>
  )
}

export default VerifyEmail

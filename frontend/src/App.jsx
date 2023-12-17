import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import {
  Signup,
  Login,
  Profile,
  VerifyEmail,
  ForgetPassword,
  NoContent,
} from './components/index'

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Profile />} />
          <Route path="/otp/verify" element={<VerifyEmail />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/404" element={<NoContent />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'

const Signin = () => {
  const[email, setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[loading, setLoading] = useState("")
  const[error, setError] = useState("")
  const navigate = useNavigate()

  // 🔐 FIX ADDED: remember where user came from
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const submit = async (e) => {
    e.preventDefault()
    setLoading("Please wait as we log you in...")

    try {
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)

      const response = await axios.post(
        "http://josephtruham.alwaysdata.net/api/signin",
        data
      )

      setLoading("")

      if (response.data.user) {

        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("token", response.data.token || "logged-in")

        console.log("User logged in:", response.data.user)
        console.log("User role:", response.data.user.role)

        if (response.data.user.role === "admin") {
          navigate('/dashboard')
        } else {
          // 🔥 FIXED: return user to original page (cart, etc.)
          navigate(from, { replace: true })
        }

      } else {
        setError(response.data.message)
      }

    } catch (error) {
      setLoading("")
      setError(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="signin-container">
        <div className="signin-bg">
            <div className="signin-card">
                <div className="signin-header">
                    <div className="signin-icon">🔐</div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={submit} className="signin-form">
                    {loading && <div className="alert alert-info">⏳ {loading}</div>}
                    {error && <div className="alert alert-danger">❌ {error}</div>}

                    <div className="form-group">
                        <label>📧 Email</label>
                        <input
                          type="email"
                          placeholder='Enter your email'
                          className='form-control'
                          value={email}
                          onChange={(e)=> setEmail(e.target.value)}
                          required
                        />
                    </div>

                    <div className="form-group">
                        <label>🔒 Password</label>
                        <input
                          type="password"
                          placeholder='Enter your password'
                          className='form-control'
                          value={password}
                          onChange={(e)=> setPassword(e.target.value)}
                          required
                        />
                    </div>

                    <button type='submit' className="btn btn-signin">
                        🚪 Sign In
                    </button>

                    <p className="signin-link">
                        Don't have an account?<Link to="/signup"> Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signin
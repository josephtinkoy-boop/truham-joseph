import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'

const Signin = () => {
  // adding state to all user inputs
    const[email, setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[loading, setLoading] = useState("")
    const[error, setError] = useState("")
    const navigate = useNavigate()
  //  function to submit data to the database
  const submit = async (e) => {
    // preventing the default behavior of the form from reloading
    e.preventDefault()
    // uploading the loading message
    setLoading("Please wait as we log you in...")
    try {
      // adding user input to data variables
    const data = new FormData ()
    data.append("email", email)
    data.append("password", password)
    // connecting and posting data to the database
    const response = await axios.post("http://josephtruham.Alwaysdata.net/api/signin", data)
    // updating the loading message to empty
    setLoading("")
    // checking if a user exist
    if (response.data.user){
      // storing the user in the browser local storage
      localStorage.setItem("user", JSON.stringify(response.data.user))
      // redirecting the logged user to landing page
      navigate('/')
    }
    else{
      // error for login fail
      setError(response.data.message)
    }
    } catch (error) {
      //updating loading message to empty
      setLoading("")
      // update the error
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
                        <input type="email" placeholder='Enter your email' className='form-control' value={email}  onChange = {(e)=> setEmail(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>🔒 Password</label>
                        <input type="password" placeholder='Enter your password'className='form-control' value={password}  onChange = {(e)=> setPassword(e.target.value)} required/>
                    </div>

                    <button type='submit' className="btn btn-signin">
                        🚪 Sign In
                    </button>

                    <p className="signin-link">
                        Don't have an account?<Link to = "/signup"> Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signin



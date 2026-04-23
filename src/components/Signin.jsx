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
    setLoading("please wait as we log you in")
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
      setError(error.response.data.message) 
    }
  }

  return (
    <div className="row mt-4 justify-content-center">
    <div className="col-md-6 card shadow p-4">
      <h2>sign in</h2>
      <form action="" onSubmit={submit} className='btn btn-dark'>
        {loading}
        {error}
        <input type="email" placeholder='Email' className='form-control' value={email}  onChange = {(e)=> setEmail(e.target.value)} required/><br />
        <input type="password" placeholder='Password'className='form-control' value={password}  onChange = {(e)=> setPassword(e.target.value)} required/><br />
        <button type='submit' className="btn btn-success form-control">
          sign in
        </button>
        <p>Don't have an account?<Link to = "/signup">Sign up</Link></p>
      </form>
    </div>
    </div>
  )
}

export default Signin



import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"


const SignUp = () => {
  // adding state to all user inputs
    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[phone, setPhone] = useState ("")

    // states for success, error and loading messages
    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    // function to post user input in the database
    const submit = async (e) => {
        // prevent the page from reloading before the data is saved in the database
        e.preventDefault()
        setLoading("Please wait as we uppload your data!")
        // sending user input to the database
        try {
            const data = new FormData()
            // appending data to the FormData variable
            data.append("username", username)
            data.append("email", email)
            data.append("password", password)
            data.append("phone",phone)

            // using axios to post our data to the database
            const response = await axios.post ("http://josephtruham.alwaysdata.net/api/signup", data)
            // removing the loading message by setting it to empty
            setLoading("")
            // adding success message after successful data posting in the database
            setSuccess(response.data.Success)

            // clearing the form fields making the work easy for the user
            setUsername("")
            setEmail("")
            setPassword("")
            setPhone("")
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }
    return (
        <div className="row mt-4 justify-content-center">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign up</h2>
                <form action="" onSubmit={submit} className="btn btn-dark">
                    {loading}
                    {success}
                    {error}
                    <input type="text"  placeholder="Enter username" className="form-control"
                    value = {username}
                     onChange = {(e)=> setUsername(e.target.value)} required />
                    
                     <br />
                    
                    <input type="email"  placeholder="Enter Email " className="form-control" value={email}
                    onChange={(e)=> setEmail(e.target.value)} required
                    /> 
                    <br />
                   
                    <input type="password"  placeholder="Enter password" className="form-control"  value={password} 
                    onChange={(e)=> setPassword(e.target.value)} required/> 
                  
                    <br />
                    
                    <input type="tel"  placeholder="Enter Phone" className="form-control" value={phone} 
                    onChange={(e)=> setPhone(e.target.value)} required />
                    
                     <br />
                    
                    <button className="btn btn-info" type="submit">
                        Sign Up
                    </button>
                    <p>Already have an account? <Link to = "/signin">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp

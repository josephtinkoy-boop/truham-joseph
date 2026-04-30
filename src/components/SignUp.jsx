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
        setLoading("Please wait as we upload your data!")
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
        <div className="signup-container">
            <div className="signup-bg">
                <div className="signup-card">
                    <div className="signup-header">
                        <div className="signup-icon">🎉</div>
                        <h2>Create Account</h2>
                        <p>Join Tinkoy Shop today</p>
                    </div>
                    
                    <form onSubmit={submit} className="signup-form">
                        {loading && <div className="alert alert-info">⏳ {loading}</div>}
                        {success && <div className="alert alert-success">✅ {success}</div>}
                        {error && <div className="alert alert-danger">❌ {error}</div>}

                        <div className="form-group">
                            <label>👤 Username</label>
                            <input type="text" placeholder="Enter username" className="form-control"
                            value = {username}
                             onChange = {(e)=> setUsername(e.target.value)} required />
                        </div>
                        
                        <div className="form-group">
                            <label>📧 Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" value={email}
                            onChange={(e)=> setEmail(e.target.value)} required />
                        </div>
                        
                        <div className="form-group">
                            <label>🔒 Password</label>
                            <input type="password" placeholder="Enter password" className="form-control"  value={password} 
                            onChange={(e)=> setPassword(e.target.value)} required/> 
                        </div>
                        
                        <div className="form-group">
                            <label>📱 Phone</label>
                            <input type="tel" placeholder="Enter Phone" className="form-control" value={phone} 
                            onChange={(e)=> setPhone(e.target.value)} required />
                        </div>
                        
                        <button type="submit" className="btn btn-signup">
                            🚀 Sign Up
                        </button>
                        
                        <p className="signup-link">
                            Already have an account? <Link to = "/signin">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp

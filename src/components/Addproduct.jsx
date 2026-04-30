import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Addproduct = () => {
  const[product_name, setProduct_name] = useState("")
  const[product_description, setProduct_description] = useState("")
  const[product_cost, setProduct_cost] = useState("")
  const[product_photo,setProduct_photo] = useState("")
  // set states for success,error and loading
    const [loading, setLoading] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    //function to post the user input to the database
    const submit = async (e) => {
      // preventing the page from reloading
      e.preventDefault()
      // uploading the loading message
      setLoading("⏳ Please wait as we upload your product!")
      // sending user input to the database 
      try {
        const data =new FormData()
        // appending data to the FormData variable
        data.append("product_name", product_name)
        data.append("product_description", product_description)
        data.append("product_cost",product_cost)
        data.append("product_photo", product_photo)

        // using axios to post our data to the database
            const response = await axios.post ("https://josephtruham.alwaysdata.net/api/add_product", data)
            console.log(response)
            // removing the loading message by setting it to empty
            setLoading("")
            // adding success message after successful data posting in the database
            setSuccess(response.data.message)
            // clearing the form fields making the work easy for the user
            setProduct_name("")
            setProduct_description("")
            setProduct_cost("")
            setProduct_photo("")

      } catch (error) {
        setLoading('')
        setError(error.message)
        console.log(error)
        
      }

    }

  return (
    <div className="addproduct-container">
        <div className="addproduct-bg">
            <div className="addproduct-card">
                <div className="addproduct-header">
                    <div className="addproduct-icon">➕</div>
                    <h2>Add New Product</h2>
                    <p>List your product on Tinkoy Shop</p>
                </div>
                
                <form onSubmit={submit} className="addproduct-form">
                    {loading && <div className="alert alert-info">⏳ {loading}</div>}
                    {success && <div className="alert alert-success">✅ {success}</div>}
                    {error && <div className="alert alert-danger">❌ {error}</div>}

                    <div className="form-group">
                        <label>📦 Product Name</label>
                        <input type="text" className='form-control' placeholder="Enter product name" value={product_name} onChange = {(e)=> setProduct_name(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>📝 Description</label>
                        <textarea name="" id="" className='form-control' placeholder="Describe your product..." value={product_description} onChange={(e)=> setProduct_description(e.target.value)} required></textarea>
                    </div>

                    <div className="form-group">
                        <label>💰 Price (KES)</label>
                        <input type="number" className='form-control' placeholder="Enter price in KES" value={product_cost} onChange={(e)=> setProduct_cost(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>🖼 Product Photo</label>
                        <input type="file" className='form-control' onChange={(e)=> setProduct_photo(e.target.files[0])} required/>
                    </div>

                    <button type='submit' className='btn btn-addproduct'> 
                        ➕ Add Product
                    </button>

                    <div className="addproduct-links">
                        <Link to="/" className="btn btn-home">🏠 Go to Home</Link>
                        <Link to="/dashboard" className="btn btn-dashboard">📊 Dashboard</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Addproduct

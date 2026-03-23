import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


const Makepayment = () => {
  const {product} = useLocation().state || {}
    const img_url = "http://josephtruham.alwaysdata.net/static/images/"
    const [phone, setPhone] = useState ("")
    const [message, setMessage] = useState ("")
    const [error, setError] = useState("")

    // Function for makepayment
    const submit = async (e)=> {
        // preventing the loading behavior of a form
        e.preventDefault()
        // set message
        setMessage("please wait as we process...")
        // connecting axios to flask api endpoint
        try {
            // attaching user input to data variables
            const data = new FormData()
            data.append("phone", phone)
            data.append("amount",product.product_cost)
            // posting data to the database
            const responsse = await axios.post("http://josephtruham.alwaysdata.net/api/mpesa_payment",data)
            // updating the message
            setMessage("Please completethe payment in your phone")
     
        } catch (error) {
            setMessage("")
            setError(error.message)
            
        }
    }
  return (
    <div className='col-md-12 justify-content-center mb-4 nt-4 row'>
      <div className='col-md-6 card shadow'>
        <h1>Makepayment-Lipa na Mpesa</h1>
        <img src={img_url + product.product_photo} alt="" />
        <p>The product name is: {product.product_name}</p>
        <p>The product description is: {product.product_description}</p>
        <p>The product cost is: {product.product_cost}</p>
        <form onSubmit={submit}>
            {message}
            {error}
            <input className='btn btn-danger' type="tel" placeholder='Enter phone 254XXX' value={phone} onChange={(e) => setPhone(e.target.value)}/><br />
            <button type='submit' className='btn btn-info form-control '>Make payment</button>
        </form>
        </div>
    </div>
  )
}

export default Makepayment

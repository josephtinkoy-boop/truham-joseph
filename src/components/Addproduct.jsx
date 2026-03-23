import React, { useState } from 'react'
import axios from 'axios'


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
      setLoading("Please wait as we uppload your data!")
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
    <div className="row mt-4 justify-content-center">
    <div className='col-md-6 p-4'>
      <h2>Add Product</h2>
      <form action="" onSubmit={submit} className='btn btn-dark'>
        {loading}
        {success}
        {error}
      <label htmlFor="">product Name</label><br />
      <input type="text" className='form-control' value={product_name} onChange = {(e)=> setProduct_name(e.target.value)} required /><br />
      <label htmlFor="">Description</label><br />
      <textarea name="" id="" className='form-control' value={product_description} onChange={(e)=> setProduct_description(e.target.value)} required></textarea><br />
       <label htmlFor="">cost(ksh)</label><br />
       <input type="number" className='form-control' value={product_cost} onChange={(e)=> setProduct_cost(e.target.value)} required/><br />
       <label htmlFor="">product photo</label><br />
       <input type="file" className='form-control' onChange={(e)=> setProduct_photo(e.target.files[0])} required/><br />
       <button type='submit' className='form-control btn btn-success'> 
        Add Product
       </button>
      </form>
    </div>
    </div>
  )
}

export default Addproduct

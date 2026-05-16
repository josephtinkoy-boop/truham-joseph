import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Addproduct = () => {

  const navigate = useNavigate()

  const [product_name, setProduct_name] = useState("")
  const [product_description, setProduct_description] = useState("")
  const [product_cost, setProduct_cost] = useState("")
  const [product_photo, setProduct_photo] = useState("")

  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // CHECK LOGIN
  useEffect(() => {

    const user = localStorage.getItem("user")

    console.log("Saved user:", user)

    if (!user) {

      navigate("/signin")

    }

  }, [navigate])

  const submit = async (e) => {

    e.preventDefault()

    setLoading("Uploading product...")
    setError("")
    setSuccess("")

    try {

      const data = new FormData()

      data.append("product_name", product_name)
      data.append("product_description", product_description)
      data.append("product_cost", product_cost)
      data.append("product_photo", product_photo)

      const response = await axios.post(
        "http://josephtruham.alwaysdata.net/api/add_product",
        data
      )

      setLoading("")
      setSuccess(response.data.message)

      // CLEAR FORM
      setProduct_name("")
      setProduct_description("")
      setProduct_cost("")
      setProduct_photo("")

    } catch (error) {

      setLoading("")
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

            {loading && (
              <div className="alert alert-info">
                {loading}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <div className="form-group">

              <label>Product Name</label>

              <input
                type="text"
                className="form-control"
                value={product_name}
                onChange={(e) => setProduct_name(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label>Description</label>

              <textarea
                className="form-control"
                value={product_description}
                onChange={(e) => setProduct_description(e.target.value)}
                required
              ></textarea>

            </div>

            <div className="form-group">

              <label>Price</label>

              <input
                type="number"
                className="form-control"
                value={product_cost}
                onChange={(e) => setProduct_cost(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label>Product Photo</label>

              <input
                type="file"
                className="form-control"
                onChange={(e) => setProduct_photo(e.target.files[0])}
                required
              />

            </div>

            <button type="submit" className="btn btn-addproduct">

              Add Product

            </button>

            <div className="addproduct-links">

              <Link to="/" className="btn btn-home">

                Go Home

              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  )
}

export default Addproduct
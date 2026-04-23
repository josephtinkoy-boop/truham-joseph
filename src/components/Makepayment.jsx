import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Makepayment = () => {
  const { product } = useLocation().state || {}

  const img_url = "http://josephtruham.alwaysdata.net/static/images/"
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setMessage("Please wait as we process...")

    try {
      const data = new FormData()
      data.append("phone", phone)
      data.append("amount", product.product_cost)

      await axios.post(
        "http://josephtruham.alwaysdata.net/api/mpesa_payment",
        data
      )

      setMessage("Please complete the payment on your phone")
      setError("")
    } catch (error) {
      setMessage("")
      setError(error.message)
    }
  }

  return (
    <div className="payment-page">

      <div className="payment-card">

        <h2>Make Payment - Lipa na Mpesa</h2>

        {/* IMAGE FIXED */}
        <img
          src={img_url + product.product_photo}
          alt={product.product_name}
          className="payment-img"
        />

        <p><b>Name:</b> {product.product_name}</p>
        <p><b>Description:</b> {product.product_description}</p>
        <p><b>Cost:</b> KES {product.product_cost}</p>

        <form onSubmit={submit}>
          {message && <p className="text-success">{message}</p>}
          {error && <p className="text-danger">{error}</p>}

          <input
            type="tel"
            placeholder="Enter phone (254...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control mb-2"
          />

          <button type="submit" className="btn btn-info w-100">
            Make Payment
          </button>
        </form>

      </div>
    </div>
  )
}

export default Makepayment
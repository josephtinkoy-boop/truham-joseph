import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Getproduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const img_url = "http://josephtruham.alwaysdata.net/static/images/"
  const navigate = useNavigate()

  // function to fetch products from the database
  const getproducts = async () => {
    // updating the loading message
    setLoading("Please wait,we are retriving the products...")
    // connecting axios to flask api to fetch data from the database
    try {
      const response = await axios.get("http://josephtruham.alwaysdata.net/api/get_product_details")
      setLoading("")
      setProducts(response.data)

    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  useEffect(() => {
    getproducts()
  }, [])
  return (
    <div className='row'>
      <h2>Available products</h2>
      {loading}
      {error}

      {/* mapping the card to all the products */}
      {products.map((product) => (
        <div className="col-md-3 justify-content-center mb-4">
          <div className='card shadow'>
            <img src={img_url + product.product_photo} alt="" className='product_img' />
            <div className="card-body">
              <h5>{product.product_name}</h5>
              <p>{product.product_description}</p>
              <p>{product.product_cost}</p>
              <span class="badge bg-danger">Mordern Brand</span>
              <button className='btn btn-dark mt-2 w-100' onClick={() => navigate("/makepayment", { state: { product } })}>purchase now</button>
            </div>
          </div>
        </div>


      )
      )
      }
    </div>

  )
}

export default Getproduct

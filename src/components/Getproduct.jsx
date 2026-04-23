import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from "./Carousel";
import AddToCartButton from "./AddToCartButton";

const Getproduct = ({ cart = [], setCart }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  const img_url = "http://josephtruham.alwaysdata.net/static/images/"
  const navigate = useNavigate()

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(search.toLowerCase())
  );

  const getproducts = async () => {
    setLoading("Please wait, we are retrieving the products...")
    try {
      const response = await axios.get("http://josephtruham.alwaysdata.net/api/get_product_details")
      setProducts(response.data || []) // ✅ safety
      setLoading("")
    } catch (error) {
      setError(error.message)
      setLoading("")
    }
  }

  useEffect(() => {
    getproducts()
  }, [])

  return (
    <div className='row'>

      {/* SEARCH */}
      <input
        className='search-input'
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Carousel products={products} />

      <h2>Available products</h2>

      {/* ✅ SAFE CART DISPLAY */}
      <h4>Cart Items: {cart?.length || 0}</h4>

      {loading}
      {error}

      {filteredProducts.map((product) => (
        <div key={product.id} className="col-md-3 mb-4">
          <div className='card shadow'>
            <img 
              src={img_url + product.product_photo} 
              alt={product.product_name} 
              className='product_img' 
            />

            <div className="card-body">
              <h5>{product.product_name}</h5>

              {/* ✅ SAFE DESCRIPTION */}
              <p>
                {product.product_description
                  ? product.product_description.split(" ").slice(0, 10).join(" ")
                  : "No description"}
                {product.product_description &&
                  product.product_description.split(" ").length > 10 && "..."}
              </p>

              <p>KES {product.product_cost}</p>

              <span className="badge bg-danger">Modern Brand</span>

              <button
                className='btn btn-dark mt-2 w-100'
                onClick={() => navigate("/makepayment", { state: { product } })}
              >
                Purchase now
              </button>

              <AddToCartButton
                product={product}
                setCart={setCart}
              />
            </div>
          </div>
        </div>
      ))}

      {/* ✅ SAFE CART PREVIEW */}
      <pre>{JSON.stringify(cart || [], null, 2)}</pre>

    </div>
  )
}

export default Getproduct;
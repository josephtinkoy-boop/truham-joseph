import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from "./Carousel";
import AddToCartButton from "./AddToCartButton";


const Getproduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState([]);

  const img_url = "http://josephtruham.alwaysdata.net/static/images/"
  const navigate = useNavigate()

  // ✅ FIXED filter (correct field)
  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(search.toLowerCase())
  );

  const getproducts = async () => {
    setLoading("Please wait, we are retrieving the products...")
    try {
      const response = await axios.get("http://josephtruham.alwaysdata.net/api/get_product_details")
      setProducts(response.data)
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

      {/* ✅ SEARCH INPUT */}
      <input
        className='search-input'
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Carousel products={products} />

      <h2>Available products</h2>
      {loading}
      {error}

      {/* ✅ ONLY use filteredProducts */}
      {filteredProducts.map((product) => (
        <div key={product.id} className="col-md-3 mb-4">
          <div className='card shadow'>
            <img src={img_url + product.product_photo} alt="" className='product_img' />
            <div className="card-body">
              <h5>{product.product_name}</h5>

              <p>
                {product.product_description.split(" ").slice(0, 10).join(" ")}
                {product.product_description.split(" ").length > 10 && "..."}
              </p>

              <p>{product.product_cost}</p>

              <span className="badge bg-danger">Modern Brand</span>

              <button
                className='btn btn-dark mt-2 w-100'
                onClick={() => navigate("/makepayment", { state: { product } })}
              >
                Purchase now
              </button>

              <AddToCartButton
                product={product}
                cart={cart}
                setCart={setCart}
              />
            </div>
          </div>
        </div>
      ))}

      
    </div>
  )
}

export default Getproduct

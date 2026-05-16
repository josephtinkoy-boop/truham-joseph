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

  const user = JSON.parse(localStorage.getItem("user")); // ✅ ADDED

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(search.toLowerCase())
  );

  const getproducts = async () => {
    setLoading("Please wait, we are retrieving the products...")
    try {
      const response = await axios.get("http://josephtruham.alwaysdata.net/api/get_product_details")
      setProducts(response.data || [])
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
    <div className="container-fluid px-4">

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-12">
          <input
            className="form-control search-input"
            style={{ maxWidth: '400px' }}
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Carousel products={products} />

      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="mb-0">Available products</h2>
        <span className="badge bg-primary fs-6">Cart Items: {cart?.length || 0}</span>
      </div>

      {loading}
      {error}

      {/* Products Grid */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">

            <div className="card shadow h-100">

              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="product-img"
              />

              <div className="card-body d-flex flex-column">

                <h5 className="card-title">
                  {product.product_name}
                </h5>

                <p className="card-text small text-muted">
                  {product.product_description
                    ? product.product_description.split(" ").slice(0, 10).join(" ")
                    : "No description"}
                  {product.product_description &&
                    product.product_description.split(" ").length > 10 && "..."}
                </p>

                <p className="fw-bold text-success h5">
                  KES {product.product_cost}
                </p>

                <span className="badge bg-danger mb-2">
                  Modern Brand
                </span>

                <div className="mt-auto">

                  {/* 🔥 FIX: PROTECT PURCHASE BUTTON */}
                  <button
                    className="btn btn-dark w-100 mb-2"
                    onClick={() => {
                      if (!user) {
                        navigate("/signin");
                        return;
                      }

                      navigate("/makepayment", {
                        state: { product }
                      });
                    }}
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
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-5">
          <h4 className="text-muted">No products found</h4>
        </div>
      )}

    </div>
  )
}

export default Getproduct;
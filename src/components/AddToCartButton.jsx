import React from "react";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ product, setCart }) => {

  const navigate = useNavigate();

  const addToCart = () => {
    if (typeof setCart !== "function") return;

    // 🔐 FIX: protect cart action (login required)
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/signin");
      return;
    }

    if (!product) return;

    const productId = product.id || product.product_id;

    setCart((prevCart) => {
      const cart = Array.isArray(prevCart) ? prevCart : [];

      const exists = cart.find(
        (item) => (item.id || item.product_id) === productId
      );

      if (exists) {
        alert("Product has already been added to cart");
      } else {
        alert("Product successfully added to cart");
      }

      if (exists) {
        return cart.map((item) =>
          (item.id || item.product_id) === productId
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      return [
        ...cart,
        {
          id: productId,
          product_id: productId,
          name: product.product_name || product.name,
          price: Number(product.product_cost || product.price || 0),
          product_photo: product.product_photo,
          qty: 1
        }
      ];
    });
  };

  return (
    <button
      className="btn btn-warning w-100 mt-2"
      onClick={addToCart}
      disabled={!product}
    >
      Add to Cart 🛒
    </button>
  );
};

export default AddToCartButton;
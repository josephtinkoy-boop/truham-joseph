import React from "react";

const AddToCartButton = ({ product, setCart }) => {

  const addToCart = () => {
    if (typeof setCart !== "function") return;
    if (!product) return;

    const productId = product.id || product.product_id;

    setCart((prevCart) => {
      const cart = Array.isArray(prevCart) ? prevCart : [];

      const exists = cart.find(
        (item) => (item.id || item.product_id) === productId
      );

      // 🔁 If already exists, increase quantity
      if (exists) {
        return cart.map((item) =>
          (item.id || item.product_id) === productId
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      // 🆕 NEW ITEM (THIS IS THE IMPORTANT FIX)
      return [
        ...cart,
        {
          id: productId,
          product_id: productId,
          name: product.product_name || product.name,
          price: Number(product.product_cost || product.price || 0),

          // ⭐ THIS FIXES YOUR IMAGE PROBLEM
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
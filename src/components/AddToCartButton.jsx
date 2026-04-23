import React from "react";

const AddToCartButton = ({ product, setCart }) => {

  const addToCart = () => {
    // 🔴 safety check: ensure setCart is actually a function
    if (typeof setCart !== "function") {
      console.error("setCart is not a function. Check props passed from parent.");
      return;
    }

    if (!product || !product.product_id) {
      console.error("Invalid product:", product);
      return;
    }

    setCart((prevCart = []) => {
      const exists = prevCart.find(
        (item) => item.product_id === product.product_id
      );

      if (exists) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  return (
    <button
      className="btn btn-warning mt-2 w-100"
      onClick={addToCart}
      disabled={!product}
    >
      Add to Cart 🛒
    </button>
  );
};

export default AddToCartButton;
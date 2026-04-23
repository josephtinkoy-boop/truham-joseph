import React from "react";

const AddToCartButton = ({ product, cart, setCart }) => {

  const addToCart = () => {
    setCart((prevCart) => {
      const exists = prevCart.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
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
    >
      Add to Cart 🛒
    </button>
  );
};

export default AddToCartButton;
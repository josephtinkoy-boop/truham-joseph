import React from "react";

const AddToCartButton = ({ product, setCart }) => {

  const addToCart = () => {
    if (typeof setCart !== "function") {
      console.error("setCart is not a function. Check props passed from parent.");
      return;
    }

    if (!product) {
      console.error("Invalid product:", product);
      return;
    }

    // ✅ normalize id (handles both id formats)
    const productId = product.product_id || product.id;

    if (!productId) {
      console.error("Product missing ID:", product);
      return;
    }

    setCart((prevCart) => {
      const exists = prevCart.find(
        (item) => (item.product_id || item.id) === productId
      );

      if (exists) {
        return prevCart.map((item) =>
          (item.product_id || item.id) === productId
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        { ...product, product_id: productId, qty: 1 }
      ];
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
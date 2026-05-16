import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cart({ cart = [], setCart }) {
  const navigate = useNavigate();

  // 🔐 AUTH GUARD (FIXED CLEAN VERSION)
  useEffect(() => {

    const token = localStorage.getItem("token");

    const isInvalid =
      !token ||
      token === "undefined" ||
      token === "null" ||
      token.trim() === "";

    if (isInvalid) {
      alert("Please login to access your cart");

      // 🔥 FIXED: was /login (wrong route)
      navigate("/signin", {
        replace: true,
        state: { from: "/cart" },
      });

      return;
    }

  }, [navigate]);

  const img_url =
    "https://josephtruham.alwaysdata.net/static/images/";

  const safeCart = Array.isArray(cart) ? cart : [];

  const removeItem = (id) => {
    if (!setCart) return;

    setCart((prev) => {
      const items = Array.isArray(prev) ? prev : [];
      return items.filter(
        (item) => (item.id || item.product_id) !== id
      );
    });
  };

  const increaseQty = (id) => {
    if (!setCart) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || item.product_id) === id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    if (!setCart) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || item.product_id) === id
          ? {
              ...item,
              qty: Math.max((item.qty || 1) - 1, 1),
            }
          : item
      )
    );
  };

  const total = safeCart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  const handleCheckout = () => {
    if (safeCart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!navigator.onLine) {
      alert("No internet connection");
      return;
    }

    try {
      sessionStorage.setItem("cart", JSON.stringify(safeCart));
      sessionStorage.setItem("total", JSON.stringify(total));

      navigate("/makepayment", {
        state: {
          cart: safeCart,
          total,
          fromCart: true,
        },
      });

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-bg">

        <div className="cart-header">
          <div className="cart-icon">🛒</div>
          <h2>Shopping Cart</h2>
          <p>Review your items before checkout</p>
        </div>

        {safeCart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>

            <Link to="/" className="btn btn-shop">
              🛍 Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">

              {safeCart.map((item, index) => (
                <div
                  key={item.id || item.product_id || index}
                  className="cart-item"
                >

                  <img
                    src={
                      item.product_photo
                        ? img_url + item.product_photo
                        : "https://via.placeholder.com/80"
                    }
                    alt={item.name || "product"}
                    className="item-image"
                  />

                  <div className="item-details">
                    <h5>{item.name || "Unnamed item"}</h5>

                    <p className="item-price">
                      KES {Number(item.price) || 0}
                    </p>

                    <div className="qty-controls">
                      <button
                        onClick={() =>
                          decreaseQty(item.id || item.product_id)
                        }
                      >
                        -
                      </button>

                      <span>{Number(item.qty) || 1}</span>

                      <button
                        onClick={() =>
                          increaseQty(item.id || item.product_id)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    KES{" "}
                    {(
                      Number(item.price || 0) *
                      Number(item.qty || 1)
                    ).toLocaleString()}
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() =>
                      removeItem(item.id || item.product_id)
                    }
                  >
                    🗑️ Remove
                  </button>

                </div>
              ))}

            </div>

            <div className="cart-summary">

              <div className="summary-row">
                <span>Subtotal ({safeCart.length} items)</span>
                <span className="summary-value">
                  KES {total.toLocaleString()}
                </span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span className="summary-value">
                  {total >= 10000 ? "FREE" : "KES 500"}
                </span>
              </div>

              <hr />

              <div className="summary-row total">
                <span>Total</span>
                <span className="total-amount">
                  KES {total.toLocaleString()}
                </span>
              </div>

              <button
                className="btn-checkout"
                onClick={handleCheckout}
              >
                💳 Proceed to Checkout
              </button>

              <Link to="/" className="btn-continue">
                ← Continue Shopping
              </Link>

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;
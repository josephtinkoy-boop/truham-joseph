import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ cart }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"));
  }, [location]);

  const roleText = user?.role?.toString?.()?.toLowerCase?.() || "";
  const isAdmin = Boolean(
    roleText.includes("admin") ||
    user?.admin === true ||
    user?.isAdmin === true ||
    user?.role === 1 ||
    user?.role === "1"
  );
  const safeCart = Array.isArray(cart) ? cart : [];

  return (
    <nav className="navbar navbar-dark bg-primary px-3">

      {/* BRAND */}
      <Link className="navbar-brand" to="/">
        Tinkoy Shop
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">

        {/* CART */}
        <Link
          to="/cart"
          className="text-warning fw-bold text-decoration-none"
        >
          🛒 Cart: {safeCart.length}
        </Link>

        {isAdmin && (
          <Link
            to="/dashboard"
            className="text-white fw-bold text-decoration-none"
            style={{ marginRight: "12px" }}
          >
            🛠️ Admin Panel
          </Link>
        )}

        {/* MENU */}
        <div className="position-relative">

          <button
            onClick={() => setOpen(!open)}
            className="btn btn-warning fw-bold px-4 py-2"
            style={{ fontSize: "16px", borderRadius: "8px" }}
          >
            Menu ▼
          </button>

          {open && (
            <div
              className="bg-dark shadow-lg p-3 position-absolute"
              style={{ 
                right: 0, 
                top: "50px", 
                minWidth: "200px",
                borderRadius: "12px",
                border: "2px solid #ffc107"
              }}
            >

              <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded mb-1" to="/" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#198754" }}>
                🏠 Home
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded mb-1" to="/signup" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#0d6efd" }}>
                📝 Signup
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded mb-1" to="/signin" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#6f42c1" }}>
                🔐 Signin
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded mb-1" to="/addproduct" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#dc3545" }}>
                ➕ Add Product
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded mb-1" to="/chat" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#20c997" }}>
                💬 Chat
              </Link>

              <hr className="border-light" />

              <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded mb-1" to="/dashboard" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#0dcaf0" }}>
                📊 Dashboard
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded" to="/chart" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#fd7e14" }}>
                📈 Chart
              </Link>
              {isAdmin && (
                <>
                  <hr className="border-warning" />
                  <Link onClick={() => setOpen(false)} className="dropdown-item d-block py-2 px-3 rounded mb-1" to="/dashboard" style={{ fontSize: "15px", color: "#fff", backgroundColor: "#d63384" }}>
                    🛠️ Admin Panel
                  </Link>
                </>
              )}
            </div>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cart = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-success px-3 position-relative">

      {/* BRAND */}
      <Link className="navbar-brand" to="/">
        Tinkoy Shop
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">

        {/* DROPDOWN */}
        <div style={{ position: "relative" }}>

          <button
            onClick={() => setOpen(!open)}
            className="btn btn-secondary"
          >
            Menu ▼
          </button>

          {/* ✅ FIX: conditional rendering properly wrapped */}
          {open && (
            <div className="dropdown-menu-custom">

              <Link onClick={() => setOpen(false)} className="dropdown-item" to="/">
                Home
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item" to="/signup">
                Signup
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item" to="/signin">
                Signin
              </Link>

              <Link onClick={() => setOpen(false)} className="dropdown-item" to="/addproduct">
                Add Product
              </Link>

            </div>
          )}

        </div>

        {/* CART */}
        <span className="text-warning fw-bold">
          Cart: {cart.length}
        </span>

      </div>
    </nav>
  );
};

export default Navbar;
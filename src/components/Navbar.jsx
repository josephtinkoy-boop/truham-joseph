import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cart = [] }) => {

  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-dark px-3">

      <Link className="navbar-brand" to="/">
        Tinkoy Shop
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">

        {/* 🔽 DROPDOWN BUTTON */}
        <div style={{ position: "relative" }}>

          <button
            onClick={() => setOpen(!open)}
            className="btn btn-secondary"
          >
            Menu ▼
          </button>

          {/* DROPDOWN MENU */}
          {open && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 1000,
                minWidth: "150px"
              }}
            >

              <Link onClick={() => setOpen(false)} to="/">
                Home
              </Link>
              <br />

              <Link onClick={() => setOpen(false)} to="/signup">
                Signup
              </Link>
              <br />

              <Link onClick={() => setOpen(false)} to="/signin">
                Signin
              </Link>
              <br />

              <Link onClick={() => setOpen(false)} to="/addproduct">
                Add Product
              </Link>

            </div>
          )}

        </div>

        {/* 🛒 CART */}
        <span className="text-warning fw-bold">
          Cart: {cart.length}
        </span>

      </div>
    </nav>
  );
};

export default Navbar;
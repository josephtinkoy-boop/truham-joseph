import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Addproduct from "./components/Addproduct";
import Getproduct from "./components/Getproduct";
import Makepayment from "./components/Makepayment";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Dashboard from "./components/Dashboard";
import Chart from "./components/Chart";
import ChatBox from "./components/ChatBox";

import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {

  // 🛒 GLOBAL CART STATE
  const [cart, setCart] = useState([]);

  // 📦 ORDERS STATE (for dashboard and order history)
  const [orders, setOrders] = useState([]);

  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar cart={cart} />

      <div className="App">

        <header className="App-header">
          <h1 style={{ color: "red" }}>Motorcycles!!!</h1>
          <h1 className="rotate-hover-title">
            WELCOME TO TINKOY'S JOSEPH ONLINE BUSINESS
          </h1>
        </header>

        {/* ROUTES */}
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Getproduct cart={cart} setCart={setCart} />}
          />

          {/* AUTH */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />

          {/* PRODUCTS */}
          <Route path="/addproduct" element={<Addproduct />} />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

          {/* PAYMENT */}
          <Route
            path='/makepayment'
            element={
              <Makepayment
                setOrders={setOrders}
              />
            }
          />

          {/* ORDERS */}
          <Route
            path="/orders"
            element={<Orders orders={orders} />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard orders={orders} />}
          />

          {/* CHART ANALYTICS */}
          <Route
            path="/chart"
            element={<Chart orders={orders} title="Sales Analytics" />}
          />

          {/* CHAT BOX */}
          <Route
            path="/chat"
            element={<ChatBox user="Seller" />}
          />

        </Routes>

      </div>

      {/* FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
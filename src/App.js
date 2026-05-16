import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { useState } from "react";

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
import Admin from "./components/Admin";

import RequireAuth from "./components/RequireAuth";
import RequireAdminAuth from "./components/RequireAdminAuth";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (

    <BrowserRouter>

      <Navbar cart={cart} />

      <div className="App">

        <header className="App-header">
          <h1 style={{ color: "blue" }}>BodaGO!!!</h1>
          <h1 className="rotate-hover-title">
            WELCOME TO TINKOY'S JOSEPH ONLINE BUSINESS
          </h1>
        </header>

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Getproduct cart={cart} setCart={setCart} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          {/* PROTECTED USER ROUTES */}
          <Route
            path="/addproduct"
            element={
              <RequireAuth>
                <Addproduct />
              </RequireAuth>
            }
          />

          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart cart={cart} setCart={setCart} />
              </RequireAuth>
            }
          />

          <Route
            path="/makepayment"
            element={
              <RequireAuth>
                <Makepayment setOrders={setOrders} />
              </RequireAuth>
            }
          />

          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders orders={orders} />
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard orders={orders} />
              </RequireAuth>
            }
          />

          <Route
            path="/chart"
            element={
              <RequireAuth>
                <Chart orders={orders} title="Sales Analytics" />
              </RequireAuth>
            }
          />

          {/* CHAT (PUBLIC OR PROTECTED — YOUR CHOICE) */}
          <Route path="/chat" element={<ChatBox user="Seller" />} />

          {/* ADMIN ROUTES */}
          <Route
            path="/dashboardadmin"
            element={
              <RequireAdminAuth>
                <Admin orders={orders} />
              </RequireAdminAuth>
            }
          />

        </Routes>

      </div>

      <Footer />

    </BrowserRouter>

  );
}

export default App;
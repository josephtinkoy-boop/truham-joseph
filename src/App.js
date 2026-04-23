import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {

  // 🛒 CART STATE (core of your app)
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>

      {/* 🔝 NAVBAR */}
      <Navbar cart={cart} />

      <div className="App">

        <header className="App-header">
          <h1 style={{ color: "red" }}>Motorcycles!!!</h1>
          <h1 className="rotate-hover-title">
            WELCOME TO TINKOY'S JOSEPH ONLINE BUSSINESS
          </h1>
        </header>

        {/* NAV LINKS (optional if navbar already handles navigation) */}
        <nav>
          <Link to='/' className='navlinks'>Home</Link>
          <Link to='/signup' className='navlinks'>Signup</Link>
          <Link to='/signin' className='navlinks'>Signin</Link>
          <Link to='/addproduct' className='navlinks'>Add Product</Link>
        </nav>

        {/* ROUTES */}
        <Routes>

          <Route
            path='/'
            element={<Getproduct cart={cart} setCart={setCart} />}
          />

          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/makepayment' element={<Makepayment />} />

        </Routes>

      </div>

      {/* 🔻 FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
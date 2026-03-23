
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <h1>Motorcycles!!!</h1>
        <h1 className='text-warning'><marquee behavior="" direction="">Welcome to Tinkoy's Joseph online bussiness</marquee></h1>
      </header>
      <nav>
        <Link to = '/signup' className='navlinks'>Signup</Link>
        <Link to ='/signin' className='navlinks'>signin</Link>
        <Link to ='/addproduct' className='navlinks'>Addproduct</Link>
      
      </nav>
      <Routes>
        <Route path='/signup' element = {<SignUp />} />
        <Route path='/signin' element = {<Signin />} />
        <Route path='/addproduct' element ={<Addproduct />} />
        <Route path='/' element ={<Getproduct />} />
        <Route path='/makepayment' element ={<Makepayment />} />
      
      
      
      
      
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;


import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <h1 style={{color:"red"}}>Motorcycles!!!</h1>
<h1 className="rotate-hover-title">
  WELCOME TO TINKOY'S JOSEPH ONLINE BUSSINESS
</h1>   </header>
      <nav>
        <Link to ='/' className='navlinks'>Home</Link>
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

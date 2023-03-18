
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './Components/Products/AddProduct';
import Checkout from './Components/CheckOut/Checkout';
import Login from './Components/Login/Login';
import MostRatedProduct from './Components/Products/MostRatedProduct';
import ProductList from './Components/Products/ProductList';
import SignUp from './Components/SignUp/SignUp';
import OrderDetails from './Components/Order/OrderDetails';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/orderdetails' element={<OrderDetails />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/ratedproduct' element={<MostRatedProduct />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

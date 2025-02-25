import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import RestaurantDetail from './pages/RestaurantDetail';
import Nav from './components/Home/Nav';
function App() {
  return (
    <BrowserRouter>
      
          <Nav />

      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/reviews/:restaurantId" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/track/:orderId" element={<Tracking />} />
          {/* Catch-all route could be added here if necessary */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

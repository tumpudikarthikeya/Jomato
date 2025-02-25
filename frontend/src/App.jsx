import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import RestaurantDetail from './pages/RestaurantDetail';
import Nav from './components/utils/Nav';
import Footer from './components/utils/Footer';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  
  // Define the paths where the Nav should not be displayed
  const noNavPaths = ['/signin', '/signup'];

  return (
    <div>
      {/* Conditionally render Nav based on the current path */}
      {!noNavPaths.includes(location.pathname) && <Nav />}

      <Routes>
        {/* Public Routes */}
        <Route element={<ProtectedRoute />}>   
          
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/reviews/:restaurantId" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/track/:orderId" element={<Tracking />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      {!noNavPaths.includes(location.pathname) && <Footer />}

    </div>
  );
}

export default App;
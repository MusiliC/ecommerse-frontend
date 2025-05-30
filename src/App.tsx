import { Routes, Route } from "react-router-dom";
import Products from "./components/products/Products";
import Providers from "./Providers";
import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/shared/PrivateRoute";
import Signup from "./components/auth/Signup";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";

function App() {
  return (
    <Providers>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />


        <Route path="/" element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirm" element={<PaymentConfirmation/>} />
        </Route>

        <Route path="/" element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Toaster />
    </Providers>
  );
}

export default App;

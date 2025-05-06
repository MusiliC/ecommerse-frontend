import { Routes, Route} from "react-router-dom";
import Products from "./components/products/Products";
import Providers from "./Providers";
import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";



function App() {


  return (
    <Providers>-
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </Providers>
  );
}

export default App

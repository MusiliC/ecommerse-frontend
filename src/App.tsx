import { Routes, Route} from "react-router-dom";
import Products from "./components/products/Products";
import Providers from "./Providers";
import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";
import { Toaster } from "react-hot-toast";



function App() {


  return (
    <Providers>-
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Toaster />
    </Providers>
  );
}

export default App

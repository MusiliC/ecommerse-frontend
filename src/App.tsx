import { Routes, Route} from "react-router-dom";
import Products from "./components/products/Products";
import Providers from "./Providers";
import Home from "./components/Home";
import Navbar from "./components/shared/Navbar";



function App() {


  return (
    <Providers>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Providers>
  );
}

export default App

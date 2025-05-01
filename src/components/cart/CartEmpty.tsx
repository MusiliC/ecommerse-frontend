import { Link } from "react-router-dom"; // Assuming you're using react-router-dom
import { ShoppingCartIcon } from "lucide-react";


const CartEmpty = () => {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <ShoppingCartIcon
          className="mx-auto h-16 w-16 text-slate-400 mb-4"
          aria-hidden="true"
        />
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-slate-500 mb-6">
          Looks like you haven't added any items yet. Start shopping to fill
          your cart!
        </p>
        <Link
          to="/products" // Adjust to your product listing route
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;

import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import ItemContent from "./ItemContent";

function Cart() {
  const { cart, totalPrice } = useAppSelector((state) => state.cart);

  

 if(!cart || cart.length === 0) return <h1>Card  Is Empty</h1>

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 ">
          <ShoppingCart />
          Your Cart
        </h1>
        <p className="text-lg text-gray-600 mt-2">All your selected items</p>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
          Product
        </div>
        <div className="justify-self-center text-lg text-slate-800">
          Quantity
        </div>
        <div className="justify-self-center text-lg text-slate-800">Price</div>
        <div className="justify-self-end text-lg text-slate-800">Total</div>
      </div>

      <div className="flex flex-col gap-3">
        {
          cart && cart.length > 0 && cart.map((item, i) => <ItemContent key={i} item = {item.item} itemQuantity = {item.quantity} />)
        }
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row flex-col sm:px-0 px-2 sm:justify-between gap-4">
        <div></div>
        <div className="flex text-sm gap-1 flex-col">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Total</span>
            <span> {totalPrice ? <p>{totalPrice}</p> : <p>0</p>}</span>
          </div>
          <p className="text-slate-500 ">
            Taxes and shipping calculated at checkout
          </p>
          <Link to={"/checkout"} className="w-full flex justify-end">
            <Button onClick={() => {}} className="w-full">
              {" "}
              <ShoppingCart /> Checkout
            </Button>
          </Link>

          <Link
            to={"/products"}
            className="w-full flex gap-2 mt-2 text-slate-500 "
          >
            <ArrowLeft />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;

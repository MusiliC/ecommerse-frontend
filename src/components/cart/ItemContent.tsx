import { cartItemType, ProductType } from "@/types";
import { TrashIcon } from "lucide-react";
import SetQuantity from "./SetQuantity";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increaseCartQuantity } from "@/redux/actions/CartAction";
import { selectCartItems } from "@/redux/reducers/cartReducer";

interface ItemContentProps {
  item: ProductType;
  itemQuantity: number;
}

function ItemContent({ item, itemQuantity }: ItemContentProps) {
  const cartItems = useAppSelector(selectCartItems) as cartItemType[];
  const cartItem = cartItems.find(
    (cartItem) => cartItem.item.productId === item.productId
  );
  const currentQuantity = cartItem ? cartItem.quantity : itemQuantity;

  const dispatch = useAppDispatch();

  const handleQuantityIncrease = (productId: number) => {
    dispatch(increaseCartQuantity(productId));
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-base text-sm gap-4 items-center border-[1px] border-slate-200 rounded-md lg:px-4 p-2">
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {item.productName}
          </h3>
        </div>
        <div className="md:w-36 sm:w-24 ">
          <img
            src={item.image}
            alt={item.productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover"
          />
        </div>

        <div className="flex items-start gap-5 mt-3">
          <button
            onClick={() => {}}
            className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-300"
          >
            Remove <TrashIcon />{" "}
          </button>
        </div>
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQtyIncrease={() => {
            handleQuantityIncrease(item.productId);
          }}
          handleQtyDecrease={() => {}}
        />
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {item.specialPrice}
      </div>

      <div className="justify-self-end lg:text-[17px] text-sm text-slate-600 font-semibold">
        {Number(item.specialPrice) * Number(currentQuantity)}
      </div>
    </div>
  );
}

export default ItemContent;

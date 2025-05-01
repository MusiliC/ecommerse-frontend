import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { truncateText } from "../utils/truncateText";
import { ProductType } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { addToCartAction } from "@/redux/actions/CartAction";
import { formatCurrency } from "../utils/formatPrice";

function ProductCard({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
}: ProductType) {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [btnLoader] = useState(false);
  const isAvailable = quantity > 0;

  const dispatch = useAppDispatch()

  const handleProductView = () => {
    setOpenProductViewModal(true);
  };

  const productData = {
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  };

  const addToCartHandler = () => {
    dispatch(addToCartAction(productData))
  }

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
      {/* Product Image */}
      <div
        onClick={handleProductView}
        className="w-full overflow-hidden aspect-[3/2] cursor-pointer"
      >
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={image}
          alt={productName}
          loading="lazy" // Added lazy loading
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2
          onClick={handleProductView}
          className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600 transition-colors"
        >
          {truncateText(productName, 40)}
        </h2>

        <div className="min-h-20 max-h-30 mb-3">
          <p className="text-gray-600 text-sm line-clamp-3">
            {truncateText(description)}
          </p>{" "}
          {/* Added line clamp */}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center">
          <div>
            {specialPrice ? (
              <div className="flex items-center">
                <span className="line-through text-gray-400 mr-2">
                  {formatCurrency(price)}
                </span>
                <span className="text-gray-700 font-semibold">
                  {formatCurrency(price)}
                </span>
              </div>
            ) : (
              <span className="text-gray-700 font-semibold">
                {formatCurrency(price)}
              </span>
            )}
          </div>
          <div>
            <button
              disabled={btnLoader || !isAvailable}
              onClick={() => addToCartHandler()}
              className={`bg-blue-500 ${
                isAvailable
                  ? "opacity-100 hover:bg-blue-600"
                  : "opacity-70 cursor-not-allowed"
              } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
              aria-label={isAvailable ? "Add to cart" : "Out of stock"}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add To Cart" : "Stock Out"}
            </button>
          </div>
        </div>
      </div>

      {/* Product View Modal */}
      <ProductViewModal
        isOpen={openProductViewModal}
        setIsOpen={setOpenProductViewModal}
        product={productData}
        isAvailable={isAvailable}
      />
    </div>
  );
}

export default ProductCard;

import { useState } from "react";
import { ProductType } from "./Products";
import { FaShoppingCart } from "react-icons/fa";

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
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState<ProductType>();
  const isAvailable = quantity > 0;

  const handleProductView = (prod: ProductType) => {
    setSelectedViewProduct(prod);
    setOpenProductViewModal(true);
  };

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductView({
            productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
          });
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"
          src={image}
          alt={productName}
        />
      </div>
      <div className="p-4 ">
        <h2
          onClick={() => {
            {
              handleProductView({
                productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice,
              });
            }
          }}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {productName}
        </h2>

        <div className="min-h-20 max-h-30 ">
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <div className="flex justify-between items-center ">
          <div>
            <span className="text-gray-500 text-sm">Price: </span>
            <span className="text-gray-700  font-semibold">
              {specialPrice ? (
                <>
                  <span className="line-through text-gray-400 mr-2">
                    kes {price.toFixed(2)}
                  </span>
                  kes {specialPrice.toFixed(2)}
                </>
              ) : (
                price
              )}
            </span>
          </div>
          <div>
            <button
              disabled={btnLoader || !isAvailable}
              onClick={() => {}}
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70 "
              } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
            >
              <FaShoppingCart className="mr-2 " />
              {isAvailable ? "Add To Cart" : "Stock Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

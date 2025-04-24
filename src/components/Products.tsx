import ProductCard from "./ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProductsAction } from "@/redux/actions/ProductionAction";


function Products() {
  const {
    products: productList,
    isLoading,
    error,
    success
  } = useAppSelector((state) => state.products);
  const { products } = useAppSelector((state) => state);
  console.log(products);


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      {isLoading ? (
        <p>Is Loading.......</p>
      ) : !success ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-3xl text-slate-800 mr-2" />
          <span className="text-slate-800 text-lg font-medium">{error}</span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {productList &&
              productList.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

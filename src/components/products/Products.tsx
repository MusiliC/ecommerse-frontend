import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Filter from "../shared/Filter";
import useProductFilter from "@/hooks/useProductFilter";
import { useEffect } from "react";
import { getCategoriesAction } from "@/redux/actions/CategoriesAction";
import Loader from "../shared/Loader";
import { PaginationComponent } from "../shared/Pagination";
import { ProductType } from "@/types";
import ErrorComponent from "../shared/ErrorComponent";


function Products() {
  const {
    products: productList,
    isLoading,
    pagination,
    error,
    success,
  } = useAppSelector((state) => state.products);

  const { categories } = useAppSelector((state) => state.categories);

  const dispatch = useAppDispatch();

  useProductFilter();

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <Loader />
      ) : !success ? (
       <ErrorComponent error={error} />
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {productList && productList
              .filter((item): item is ProductType => "productId" in item)
              .map((item) => (
                <ProductCard key={item.productId} {...item} />
              ))}
          </div>
        </div>
      )}
      <PaginationComponent numberOfPages={pagination?.totalPages} />
    </div>
  );
}

export default Products;

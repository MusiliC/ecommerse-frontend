import { ProductType } from "@/types";
import HeroBanner from "./shared/HeroBanner";
import { useAppSelector } from "@/redux/hooks";
import ProductCard from "./products/ProductCard";
import useProductFilter from "@/hooks/useProductFilter";
import Loader from "./shared/Loader";
import ErrorComponent from "./shared/ErrorComponent";

function Home() {
  const {
    products: productList,
    isLoading,
    error,
    success,
  } = useAppSelector((state) => state.products);

  useProductFilter();

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>
      <div className="py-5 ">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-700 text-4xl font-bold">Products</h1>
          <p>
            {" "}
            <span>
              Discover our handpicked selection of top-rated items just for you!
            </span>
          </p>
        </div>
      </div>
      <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {isLoading ? (
          <Loader />
        ) : !success ? (
         <ErrorComponent error = {error}/>
        ) : (
          productList &&
          productList
            ?.slice(0, 8)
            .filter((item): item is ProductType => "productId" in item)
            .map((item) => <ProductCard key={item.productId} {...item} />)
        )}
      </div>
    </div>
  );
}

export default Home;

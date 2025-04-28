import { getProductsAction } from "@/redux/actions/ProductionAction";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function useProductFilter() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Get all values directly from searchParams
    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const pageNumber = currentPage - 1;
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const category = searchParams.get("category") || "";
    const searchTerm = searchParams.get("keyword") || "";

    // Create a new URLSearchParams if you need to modify it
    const newParams = new URLSearchParams();
    newParams.set("pageNumber", pageNumber.toString());
    newParams.set("sortBy", "price");
    newParams.set("sortOrder", sortOrder);
    newParams.set("category", category);

    if (searchTerm) {
      newParams.set("keyword", searchTerm);
    }

    const queryString = newParams;

    dispatch(getProductsAction(queryString));

    // Here you would typically use the queryString for something
    // For example, dispatch an action or refetch queries
  }, [dispatch, searchParams]);
}

export default useProductFilter;

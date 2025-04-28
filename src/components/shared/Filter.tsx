import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { MoveUp, RefreshCcw, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { CategoryType } from "@/types";


type FilterProps = {
  categories: CategoryType[] | null;
}


function Filter({categories }: FilterProps) {
  const [searchParams] = useSearchParams();
  const pathName = useLocation().pathname;
  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "";
    const currentSortOrder = searchParams.get("sortOrder") || "asc";
    const currentSearchOrder = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchOrder);
  }, [searchParams]);

  const handleCategoryChange = (selectedValue: string) => {
    setCategory(selectedValue);

    if (selectedValue === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedValue);
    }
    navigate(`${pathName}?${params}`);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";     
      
      params.set("sortOrder", newOrder);
      navigate(`${pathName}?${params}`);
      return newOrder;
    });


  };

  const handleClearFilter = () => {
    navigate({ pathname: window.location.pathname });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathName}?${searchParams.toString()}`);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [navigate, params, pathName, searchParams, searchTerm]);
  
  

  return (
    <div>
      <div className="flex lg:flex-row flex-row-reverse lg:justify-between justify-center items-center gap-4">
        <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
          <Input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-2">
            <Search className="text-slate-800" />
          </span>
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories && categories.map((category) => (
                  <SelectItem
                    key={category.categoryId}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={toggleSortOrder}>
                    {sortOrder === "asc" ? (
                      <MoveUp className="rotate-180" />
                    ) : (
                      <MoveUp />
                    )}
                    Sort By
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Asc</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Button variant="destructive" onClick={handleClearFilter}>
              <RefreshCcw /> Clear Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

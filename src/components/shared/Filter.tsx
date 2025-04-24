import { useState } from "react";
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

const categories = [
  {
    catId: 1,
    name: "Category 1",
  },
  {
    catId: 2,
    name: "Category 2",
  },
  {
    catId: 3,
    name: "Category 3",
  },
];

function Filter() {
  const [category, setCategory] = useState("all");

  return (
    <div>
      <div className="flex lg:flex-row flex-row-reverse lg:justify-between justify-center items-center gap-4">
        <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
          <Input type="text" placeholder="Search Products" />
          <span className="absolute right-2">
            <Search className="text-slate-800" />
          </span>
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center">
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((category) => (
                  <SelectItem key={category.catId} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <MoveUp /> Sort By
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Asc</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Button variant="destructive">
              <RefreshCcw /> Clear Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

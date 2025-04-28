import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface PaginationComponentProps {
  numberOfPages: number | undefined;
}

export function PaginationComponent({
  numberOfPages,
}: PaginationComponentProps) {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    navigate(`${pathname}?${newParams.toString()}`);
  };

  if (!numberOfPages || numberOfPages <= 0) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <span className="text-slate-800 text-lg font-medium">No Pages</span>
      </div>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          />
        </PaginationItem>

        {Array.from({ length: numberOfPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, numberOfPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

const PaginationComponent = ({totalPages,page,webkey,searchParams,setSearchParams}) => {
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <button
            onClick={() => handlePageChange(Math.max(parseInt(page) - 1, 1))}
            disabled={parseInt(page) === 1}
            className={parseInt(page) === 1 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <PaginationPrevious />
          </button>
        </PaginationItem>

        <PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationLink key={i}>
              <button
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-lg mx-1 ${
                  parseInt(page) === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                }`}
              >
                {i + 1}
              </button>
            </PaginationLink>
          ))}
        </PaginationItem>

        <PaginationItem>
          <button
            onClick={() => handlePageChange(Math.min(parseInt(page) + 1, totalPages))}
            disabled={parseInt(page) === totalPages}
            className={parseInt(page) === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <PaginationNext />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
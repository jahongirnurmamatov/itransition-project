import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

const PaginationComponent = ({totalPages,page}) => {
  console.log(totalPages,page)
  return (
    <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <Link
              to={`/users?page=${Math.max(parseInt(page) - 1, 1)}`}
              className={page == 1 ? 'opacity-50 cursor-not-allowed' : ''}
              aria-disabled={page == 1} 
            >
              <PaginationPrevious />
            </Link>
         </PaginationItem>
  
          <PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationLink key={i}>
                <Link
                  to={`/users?page=${i + 1}`}
                  className={`px-3 py-1 rounded-lg mx-1 ${
                    parseInt(page) === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                  }`}
                >
                  {i + 1}
                </Link>
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <Link
              to={`/users?page=${Math.min(parseInt(page) + 1, totalPages)}`}
              className={page == totalPages ? 'opacity-50 cursor-not-allowed' : ''}
              aria-disabled={page == totalPages} 
            >
              <PaginationNext />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}

export default PaginationComponent
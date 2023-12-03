import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  goToFirstPage,
  goToLastPage,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex md:justify-end justify-center my-4 text-black gap-x-3 relative ">
      <p className="my-auto text-slate-900 font-medium md:text-sm text-xs md:relative absolute md:bottom-0 -bottom-6">{`Page ${currentPage} of ${totalPages}`}</p>
      <ul className="flex md:space-x-2 ">
        <li>
          <Button
            variant={"ghost"}
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            className="border rounded-md py-1 px-2"
          >
            <ChevronsLeft className="h-5 w-5" />
          </Button>
        </li>
        <li>
          <Button
            variant={"ghost"}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border rounded-md py-1 px-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page} className="text-lg">
            <Button
              variant={"ghost"}
              className={`border rounded-md p-4 ${
                currentPage === page ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          </li>
        ))}
        <li>
          <Button
            variant={"ghost"}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border rounded-md py-1 px-2"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </li>
        <li>
          <Button
            variant={"ghost"}
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
            className="border rounded-md py-1 px-2"
          >
            <ChevronsRight className="h-5 w-5" />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Page } from "src/types";

type TableNavProps<T> = {
  data: Page<T>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const TableNav = <T,>({ data, page, setPage }: TableNavProps<T>) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
      <div className="text-sm text-gray-600 dark:text-gray-300">
        <p className="font-medium">
          Total: <span className="font-bold">{data.totalElements}</span>
        </p>
        <p>
          Page <span className="font-semibold">{data.number + 1}</span> sur{" "}
          <span className="font-semibold">{data.totalPages}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          aria-label="Page précédente"
          className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
            page === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
              : "bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 dark:bg-gray-700 dark:text-indigo-300 dark:hover:bg-gray-600"
          }`}
          onClick={() => setPage(prev => prev - 1)}
          disabled={page === 0}
        >
          <ChevronLeft size={16} />
          Précédent
        </button>

        <button
          aria-label="Page suivante"
          className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
            data && page >= data.totalPages - 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
              : "bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 dark:bg-gray-700 dark:text-indigo-300 dark:hover:bg-gray-600"
          }`}
          onClick={() => setPage(prev => prev + 1)}
          disabled={data && page >= data.totalPages - 1}
        >
          Suivant
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default TableNav;

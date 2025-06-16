import { useEffect, useState } from "react";
import ProductsFilter from "../components/consultProducts/ProductsFilter";
import ProductsTable from "../components/consultProducts/ProductsTable";
import { Package} from "lucide-react";
import TableNav from "src/components/ui/TableNav";
import { StockStatus } from "@/services/api/product/types";
import { useGetProducts } from "@/services/api/product/hooks";

const ConsultProducts: React.FC = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(7);
  const [searchKey, setSearchKey] = useState<string>("");
  const [stockStatus, setStockStatus] = useState<StockStatus | "ALL">("ALL");
  
  const { data, isPending, refetch } = useGetProducts({
    status: stockStatus,
    keyword: searchKey,
    page,
    size
  });
   
  useEffect(() => {
    refetch();
  }, [searchKey, stockStatus, page, refetch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
    

      <ProductsFilter 
        setSearchKey={setSearchKey}  
        setStockStatus={setStockStatus} 
        selectedStockStatus={stockStatus} 
        isPending={isPending} 
      />

      {isPending ? (
        <div className="w-full flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : data?.content && data.content.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <ProductsTable data={data.content || []} />
          <TableNav data={data} page={page} setPage={setPage} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Package className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300">Aucun produit trouvé</p>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </div>
  );
};

export default ConsultProducts;
import { SearchInput } from 'src/components/ui';
import Select from 'src/components/ui/Select';
import { X } from "lucide-react";
import { StockStatus } from '@/services/api/product/types';

type ProductsFilterProps = {
  setStockStatus: (status: StockStatus | "ALL") => void;
  setSearchKey: (key: string) => void;
  isPending: boolean;
  selectedStockStatus: StockStatus | "ALL";
};

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  setStockStatus,
  setSearchKey,
  isPending,
  selectedStockStatus,
}) => {
  const optionsMap = new Map<string, string>([
    ["ALL", "Tous les produits"],
    ["IN_STOCK", "En stock"],
    ["LOW_STOCK", "Stock faible"],
    ["OUT_OF_STOCK", "Rupture de stock"]
  ]);
     
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filtres</h2>
        
        <div className="flex flex-col lg:flex-row w-full gap-4 items-end">
          <div className="w-full lg:w-2/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recherche
            </label>
            <SearchInput 
              setSearchKey={setSearchKey} 
              isPending={isPending} 
              placeholder="Rechercher par désignation, catégorie ou référence"
              //className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 transition-all"
            />
          </div>
          
          <div className="w-full lg:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              État du stock
            </label>
            <Select
              mapOptions={optionsMap}
              setOption={setStockStatus}
              selectedOption={selectedStockStatus}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
            />
          </div>
          
          <div className="flex gap-2 mt-2 lg:mt-0">
            <button 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-all text-sm font-medium flex items-center gap-1"
              onClick={() => {
                setSearchKey("");
                setStockStatus("ALL");
              }}
            >
              <X />
              Réinitialiser
            </button>
            
            
          </div>
        </div>
      </div>
      
      {isPending && (
        <div className="bg-blue-50 dark:bg-blue-900/20 px-5 py-2 border-t border-blue-100 dark:border-blue-800 flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-indigo-500 dark:border-indigo-400"></div>
          <span className="text-sm text-blue-700 dark:text-blue-300">Chargement des résultats...</span>
        </div>
      )}
    </div>
  );
};

export default ProductsFilter;
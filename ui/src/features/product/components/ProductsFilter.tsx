import { SearchInput } from 'src/components/ui';
import Select from 'src/components/ui/Select';
import { StockStatus } from 'src/services/api/product';


type ProductsFilterProps = {
  setStockStatus: (status: StockStatus) => void;
  setSearchKey: (key: string) => void;
  isPending: boolean;
  selectedStockStatus: StockStatus;
  defaultOption? : StockStatus;
};
const ProductsFilter2 : React.FC<ProductsFilterProps> = ({setStockStatus,setSearchKey,isPending,selectedStockStatus,defaultOption}) => {
    const optionsMap = new Map<string, string>([
        ["ALL", "Tous les produits"],
        ["IN_STOCK", "En stock"],
        ["LOW_STOCK", "Stock faible"],
        ["OUT_OF_STOCK", "Rupture de stock"]
      ]);
      
      
      
    return (
        <div className="card p-4 shadow-md rounded-lg">
  
        <div className="flex flex-col sm:flex-row w-full gap-2 mb-4">
        <div className="w-full sm:w-2/3">
            <SearchInput setSearchKey={setSearchKey} isPending={isPending} placeholder="Rechercher par désignation, catégorie ou référence"/>
        </div>
        <div className="w-full sm:w-1/3">
            <Select
            options={optionsMap}
            setOption={setStockStatus}
            selectedOption={selectedStockStatus}
            />
        </div>
        </div>
   
  </div>
    );
}
export default ProductsFilter2 ;
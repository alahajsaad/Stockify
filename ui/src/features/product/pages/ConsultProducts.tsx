import { useEffect, useState } from "react";
import { StockStatus, useGetFiltredProducts } from "src/services/api/product";
import ProductsFilter from "../components/ProductsFilter";
import ProductsTable from "../components/ProductsTable";
import { Button } from "src/components/ui";

const ConsultProducts : React.FC = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchKey, setSearchKey] = useState<string>("");
    const [stockStatus,setStockStatus] =useState<StockStatus>("ALL")

    const { data, isPending ,refetch} = useGetFiltredProducts({
        status: stockStatus,
        keyword: searchKey,
        page,
        size
      });

    
    useEffect(()=>{
        refetch()
    },[searchKey,stockStatus,page,refetch])

    return (
        <div className="">
        <ProductsFilter setSearchKey={setSearchKey}  setStockStatus={setStockStatus} selectedStockStatus={stockStatus} isPending={isPending} defaultOption={"ALL"}/>
        <ProductsTable data={data?.content || []}/>
        <div className="flex items-center justify-between mt-4">
  <div>
    {data && data.content.length > 0 ? (
      <>
        <p>Total produits : {data.totalElements}</p>
        <p>Page : {data.number + 1} / {data.totalPages}</p>
      </>
    ) : (
      <p>Aucun produit trouvé</p>
    )}
  </div>
  <div className="flex gap-2">
    <Button 
      onClick={() => setPage(prev => prev - 1)} 
      disabled={page === 0}
    >
      Précédent
    </Button>
    <Button 
      onClick={() => setPage(prev => prev + 1)} 
      disabled={data && page >= data.totalPages - 1}
    >
      Suivant
    </Button>
  </div>
</div>

        
        </div>
    );
}
export default ConsultProducts ;
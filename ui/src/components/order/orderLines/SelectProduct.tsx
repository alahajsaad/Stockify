import { useGetProducts } from "@/services/api/product/hooks";
import { Product } from "@/services/api/product/types";
import { PriceDisplay, StockStatusDisplay } from "@/services/api/supplier_order/utils";
import { useEffect, useState } from "react";
import { SearchInput } from "src/components/ui";
import Table from "src/components/ui/Table";

type TransformedData = {
  id: number;
  designation: string;
  price: JSX.Element;
  stockStatus: JSX.Element;
}
interface SelectProductProps {
  onProductSelect: (product: Product) => void;
}

const SelectProduct: React.FC<SelectProductProps> = ({ onProductSelect}) => {
  const [searchKey, setSearchKey] = useState<string>();    
  
  const { data: products, isPending, refetch } = useGetProducts({ 
    keyword: searchKey,
    page: 0,
    size: 10 
  });

    const handleProductSelect = (productId: number) => {
    const selectedProduct = products?.content.find((product) => product.id === productId);
    if (selectedProduct) {
      onProductSelect(selectedProduct); // Pass entire product object
    }
  };

  useEffect(() => {
    if (searchKey !== undefined) {
      refetch();
    }
  }, [searchKey, refetch]);

  const head = ["Désignation", "Prix", "Stock"];
  const tableData: TransformedData[] = products?.content?.map(product => ({
    id: product.id,
    designation: product.designation,
    price: PriceDisplay(product.lastPurchasePrice, product.lastSalePrice),
    stockStatus: StockStatusDisplay(product.stockStatus, product.quantity)
  })) || [];

  return (
    <div className="relative">
      <SearchInput placeholder="Rechercher un article..." setSearchKey={setSearchKey}isPending={isPending}/>
      <div className="mt-4">
        <Table 
          head={head} 
          data={tableData} 
          variant="WithSelect" 
          onSelect={handleProductSelect}
        />
      </div>
    </div>
  );
};

export default SelectProduct;
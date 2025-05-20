import { useEffect, useState } from "react";
import { SearchInput } from "src/components/ui";
import Table from "src/components/ui/Table";
import { StockStatus, useGetFiltredProducts } from "src/services/api/product";

type TransformedData = {
  id: number;
  designation: string;
  price: JSX.Element;
  stockStatus: JSX.Element;
}

interface SelectProductProps {
  onProductSelect: (productId: number) => void;
  selectedProductId?: number;
}

const SelectProduct: React.FC<SelectProductProps> = ({ onProductSelect, selectedProductId }) => {
  const [searchKey, setSearchKey] = useState<string>();    
  const { data: products, isPending, refetch } = useGetFiltredProducts({ 
    keyword: searchKey,
    page: 0,
    size: 10 
  });

  // Handle product selection
  const handleProductSelect = (productId: number) => {
    onProductSelect(productId);
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchKey(value);
  };

  useEffect(() => {
    if (searchKey !== undefined) {
      refetch();
    }
  }, [searchKey, refetch]);

  // Display price with colored formatting
  const PriceDisplay = (lastPurchasePrice: number, lastSalePrice: number) => {
    return (
      <div className="flex flex-col space-y-1">
        <p>Dernier achat: <span className="text-red-600 font-medium">{lastPurchasePrice} €</span></p>
        <p>Dernier vente: <span className="text-green-600 font-medium">{lastSalePrice} €</span></p>
      </div>
    );
  };

  // Display stock status with badge and quantity
  const StockStatusDisplay = (stockStatus: StockStatus, quantity: number) => {
    let badgeClass = '';
    let statusText = '';
    
    switch(stockStatus) {
      case 'IN_STOCK':
        badgeClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        statusText = 'En stock';
        break;
      case 'LOW_STOCK':
        badgeClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        statusText = 'Stock faible';
        break;
      case 'OUT_OF_STOCK':
        badgeClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        statusText = 'Rupture';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        statusText = String(stockStatus);
    }
    
    return (
      <div className="flex flex-col">
        <span className={`px-2 py-1 inline-flex text-xs font-medium rounded-md ${badgeClass}`}>
          {statusText}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Quantité: {quantity}
        </span>
      </div>
    );
  };

  const head = ["Désignation", "Prix", "Stock"];
  
  // Transform data with JSX elements
  const tableData: TransformedData[] = products?.content?.map(product => ({
    id: product.id,
    designation: product.designation,
    price: PriceDisplay(product.lastPurchasePrice, product.lastSalePrice),
    stockStatus: StockStatusDisplay(product.stockStatus, product.quantity)
  })) || [];

  return (
    <div className="relative">
      <SearchInput 
        placeholder="Rechercher un article..." 
        setSearchKey={handleSearchChange}
        isPending={isPending}
      />
      
      <div className="mt-4">
        <Table 
          head={head} 
          data={tableData} 
          variant="WithSelect" 
          onSelect={handleProductSelect}
          //selectedId={selectedProductId}
        />
      </div>
    </div>
  );
};

export default SelectProduct;
import { StockStatus } from "../product/types";

 // Display price with colored formatting
 export const PriceDisplay = (lastPurchasePrice: number, lastSalePrice: number) => {
    return (
      <div className="flex flex-col space-y-1">
        <p>Dernier achat: <span className="text-red-600 font-medium">{lastPurchasePrice} €</span></p>
        <p>Dernier vente: <span className="text-green-600 font-medium">{lastSalePrice} €</span></p>
      </div>
    );
  };

  // Display stock status with badge and quantity
 export const StockStatusDisplay = (stockStatus: StockStatus, quantity: number) => {
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
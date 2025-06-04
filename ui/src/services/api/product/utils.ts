import { StockStatus } from "./types";

  type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

interface StockDisplay {
  badgeClass: string;
  statusText: string;
}

const StockStatusDisplay = (stockStatus: StockStatus, quantity: number): StockDisplay => {
  let badgeClass = '';
  let statusText = '';

  switch (stockStatus) {
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

  return { badgeClass, statusText };
};


/// use it 
/// const { badgeClass, statusText } = StockStatusDisplay('LOW_STOCK', 5);
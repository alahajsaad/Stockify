import { Product } from "src/services/api/product";
import { StockStatusDisplay } from "./StockStatusDisplay";
import { PenSquare, Eye } from "lucide-react";
import { Paths } from "src/lib/paths";

type ProductsTableProps = {
  data: Product[];
};

type TransformedData = {
  id: number;
  designation: string;
  reference: string;
  stockStatus: JSX.Element;
  category: string;
  lastPurchasePrice?: number;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data }) => {
  const head = ["Désignation", "Référence", "État du stock", "Catégorie", "Dernier prix d'achat", "Actions"];
  
  // Transformer les données du produit
  const tableData: TransformedData[] = data.map(product => ({
    id: product.id,
    designation: product.designation,
    reference: product.reference,
    stockStatus: StockStatusDisplay(product.stockStatus, product.quantity),
    category: product.category.name,
    lastPurchasePrice: product.lastPurchasePrice
  }));

  

  // Formater le prix avec le symbole €
  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return '—';
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Remplacer le rendu standard du tableData pour avoir plus de contrôle sur l'affichage
  const customRender = (item: TransformedData) => {
    return (
      <tr
        className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-all border-b border-gray-200 dark:border-gray-700"
        key={item.id}
        onClick={() => window.location.href = `${Paths.products}/${item.id}`}
      >
        <td className="px-6 py-4">
          <div className="font-medium text-gray-900 dark:text-white">{item.designation}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-600 dark:text-gray-300 font-mono">{item.reference}</div>
        </td>
        <td className="px-6 py-4">
          {item.stockStatus}
        </td>
        <td className="px-6 py-4">
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-xs font-medium">
            {item.category}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium">{formatPrice(item.lastPurchasePrice)}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex gap-2 justify-center">
            <button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Action pour voir les détails
              }}
              title="Voir détails"
            >
            <Eye size={20} className="text-current" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-yellow-600 dark:text-yellow-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Action pour modifier
              }}
              title="Modifier"
            >
              <PenSquare size={20} className="text-current" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {head.map((headerText, index) => (
                <th 
                  key={index}
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {headerText}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {data.length > 0 ? (
              tableData.map(item => customRender(item))
            ) : (
              <tr>
                <td colSpan={head.length} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Aucun produit disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
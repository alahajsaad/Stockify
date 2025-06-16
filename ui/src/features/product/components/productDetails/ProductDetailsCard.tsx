import { Product, StockStatus } from "@/services/api/product/types";
import { Button } from "src/components/ui";

type ProductDetailsCardProps = {
  product: Product;
};

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ product }) => {
  const getStockStatus = (status: StockStatus) => {
    if (status === 'IN_STOCK') {
      return 'En stock';
    } else if (status === 'LOW_STOCK') {
      return 'Stock faible';
    } else if (status === 'OUT_OF_STOCK') {
      return 'Rupture de stock';
    }
    return '';
  };

   const stockStatusClasses: Record<StockStatus, string> = {
    IN_STOCK: "bg-green-600 text-white",
    LOW_STOCK: "bg-yellow-500 text-white",
    OUT_OF_STOCK: "bg-red-600 text-white",
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-indigo-50">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">{product.designation}</h2>
            <p className="text-sm text-gray-600">Réf: {product.reference}</p>
            <span className={`inline-block px-2 py-1 mt-2 text-sm rounded-md ${stockStatusClasses[product.stockStatus]}`}>
              {getStockStatus(product.stockStatus)}
            </span>
          </div>
          <Button className="ml-4">Modifier</Button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Quantité en stock</p>
          <p className="text-xl font-medium">{product.quantity} unités</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Point critique de stock</p>
          <p className="text-xl font-medium">{product.criticalThreshold} unités</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Dernier prix d'achat</p>
          <p className="text-xl font-medium">{product.lastPurchasePrice} dinar</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Dernier prix de vente</p>
          <p className="text-xl font-medium">{product.lastSalePrice} dinar</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Catégorie</p>
          <p className="text-xl font-medium">{product.category.name}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-500">Taux de TVA</p>
          <p className="text-xl font-medium">{product.vat.rate}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
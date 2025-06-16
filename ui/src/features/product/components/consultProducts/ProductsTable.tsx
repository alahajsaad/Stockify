import { Product } from "@/services/api/product/types";
import { StockStatusDisplay } from "./StockStatusDisplay";
import Table from "@/components/ui/Table";

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
  const head = ["Désignation", "Référence", "État du stock", "Catégorie", "Dernier prix d'achat"];
  // Formater le prix avec le symbole €
  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return '—';
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  };
  // Transformer les données du produit
  const tableData: TransformedData[] = data.map(product => ({
    id: product.id,
    designation: product.designation,
    reference: product.reference,
    stockStatus: StockStatusDisplay(product.stockStatus, product.quantity),
    category: product.category.name,
    lastPurchasePrice: formatPrice(product.lastPurchasePrice)
  }));

  

  

  

  return (
    <Table head={head} data={tableData} variant={"WithNavigation"}/>
  );
};

export default ProductsTable;
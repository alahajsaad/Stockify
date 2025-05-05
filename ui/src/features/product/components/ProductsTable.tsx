import Table from "src/components/ui/Table";
import { Product } from "src/services/api/product";

type ProductsTableProps = {
  data: Product[];
  route?: string;
};

type TransformedData = {
  id: number;
  designation: string;
  reference: string;
  stockStatus: string;
  category: string;
  lastPurchasePrice?: number;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data, route = '/products' }) => {
  const head = ["Désignation", "Référence", "État du stock", "Catégorie", "Dernier prix d'achat"];
  
  // Transformer les données du produit
  const tableData: TransformedData[] = data.map(product => ({
    id: product.id,
    designation: product.designation,
    reference: product.reference,
    stockStatus: `${product.stockStatus} / ${product.quantity}`,
    category: product.category.name,
    lastPurchasePrice: product.lastPurchasePrice
  }));

  // Spécifier l'ordre d'affichage des champs
  const displayFields: (keyof TransformedData)[] = [
    'designation',
    'reference',
    'stockStatus',
    'category',
    'lastPurchasePrice'
  ];

  return (
    <Table<TransformedData>
      data={tableData} 
      head={head} 
      route={route}
      displayFields={displayFields}
    />
  );
};

export default ProductsTable;
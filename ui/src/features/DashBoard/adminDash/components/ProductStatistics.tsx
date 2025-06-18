import { Card, CardBody } from "@/components/ui/Card";
import { useGetProductStatistics } from "@/services/api/product/hooks";

const ProductStatistics = () => {
  const { data: statistics, isPending } = useGetProductStatistics();

  // Transformation des données en format utilisable pour les cartes
  const transformedData = [
    {
      title: "Nombre total des produits",
      value: statistics?.data?.total || 0,
      description: "Total des produits",
      changeType: "neutral"
    },
    {
      title: "Produits en stock",
      value: statistics?.data?.inStockProducts || 0,
      description: "Disponibles",
      changeType: "positive"
    },
    {
      title: "Produits en état critique",
      value: statistics?.data?.lowStockProducts || 0,
      description: "Stock faible",
      changeType: "warning"
    },
    {
      title: "Produits fin de stock",
      value: statistics?.data?.outOfStockProducts || 0,
      description: "Rupture de stock",
      changeType: "negative"
    }
  ];

  
  const getCardStyle = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "!bg-green-50 !border-green-300";
      case "warning":
        return "!bg-yellow-50 !border-yellow-300";
      case "negative":
        return "!bg-red-50 !border-red-300";
      default:
        return "!bg-blue-50 !border-blue-300";
    }
  };

  

  // Fonction pour définir la couleur du texte selon le type
  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-700";
      case "warning":
        return "text-yellow-700";
      case "negative":
        return "text-red-700";
      default:
        return "text-blue-700";
    }
  };

  // Affichage du loading si les données sont en cours de chargement
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card 
            key={index} 
            className="!bg-blue-200 !border-blue-300 animate-pulse"
          >
            <CardBody className="p-4">
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {transformedData.map((item, index) => (
        <Card 
          key={index} 
        className={`border-2 ${getCardStyle(item.changeType)}`}

        >
          <CardBody className="p-4">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {item.value}
            </div>
            <div className="text-sm font-medium text-gray-800 mb-1">
              {item.title}
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-xs font-medium ${getChangeColor(item.changeType)}`}>
                {item.description}
              </span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ProductStatistics;
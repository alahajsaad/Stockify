import { Package ,AlertTriangle , TrendingUp , Calendar} from "lucide-react";
import { Card, CardBody, CardHeader } from "src/components/ui/Card";

const StockSummaryCards : React.FC = () => {
    const summaryData = [
    {
      title: "Produits en stock",
      value: "1,247",
      icon: Package,
      change: "+12.5%",
      changeType: "positive",
      description: "Depuis le mois dernier"
    },
    {
      title: "Alertes stock bas",
      value: "23",
      icon: AlertTriangle,
      change: "-8.2%",
      changeType: "negative",
      description: "Produits sous le seuil",
      urgent: true
    },
    {
      title: "Expirations proche",
      value: "15",
      icon: Calendar,
      change: "+3.1%",
      changeType: "warning",
      description: "Dans les 30 jours",
      urgent: true
    },
    {
      title: "Valeur totale",
      value: "€125,340",
      icon: TrendingUp,
      change: "+14.3%",
      changeType: "positive",
      description: "Valeur de l'inventaire"
    }
  ];

  const getCardStyle = (urgent: boolean, changeType: string) => {
    if (urgent && changeType === "negative") return "border-red-200 bg-red-50";
    if (urgent && changeType === "warning") return "border-orange-200 bg-orange-50";
    return "";
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      case "warning": return "text-orange-600";
      default: return "text-gray-600";
    }
  };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.map((item, index) => (
        <Card key={index} className={getCardStyle(item.urgent || false, item.changeType)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <p className="text-sm font-medium text-gray-600">{item.title}</p>
            <item.icon className={`h-4 w-4 ${item.urgent ? 'text-red-500' : 'text-gray-500'}`} />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-xs font-medium ${getChangeColor(item.changeType)}`}>
                {item.change}
              </span>
              <span className="text-xs text-gray-500">{item.description}</span>
            </div>
          </CardBody>
        </Card>
      ))}
        </div>
    );
}
export default StockSummaryCards ;
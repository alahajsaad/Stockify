import Table from "@/components/ui/Table";
import { Subscription, SubscriptionStatus } from "@/services/api/company/types";


type TransformedData = {
  id: number;
  plan: string;
  startDate: string;
  endDate: string;
  statut: JSX.Element;
}

interface SubscriptionHistoryProps {
    subscriptions: Subscription[]
}

const StatutDisplay = (status: SubscriptionStatus): JSX.Element => {
  const getStatusConfig = (status: SubscriptionStatus) => {
    switch (status) {
      case "ACTIVE":
        return {
          text: "Actif",
          bgColor: "bg-green-100 dark:bg-green-900",
          textColor: "text-green-800 dark:text-green-200",
          dotColor: "bg-green-500"
        };
      case "CANCELLED":
        return {
          text: "Annulé",
          bgColor: "bg-red-100 dark:bg-red-900",
          textColor: "text-red-800 dark:text-red-200",
          dotColor: "bg-red-500"
        };
      case "EXPIRED":
        return {
          text: "Expiré",
          bgColor: "bg-orange-100 dark:bg-orange-900",
          textColor: "text-orange-800 dark:text-orange-200",
          dotColor: "bg-orange-500"
        };
      case "ALL":
        return {
          text: "Tous",
          bgColor: "bg-gray-100 dark:bg-gray-700",
          textColor: "text-gray-800 dark:text-gray-200",
          dotColor: "bg-gray-500"
        };
      default:
        return {
          text: "Inconnu",
          bgColor: "bg-gray-100 dark:bg-gray-700",
          textColor: "text-gray-800 dark:text-gray-200",
          dotColor: "bg-gray-500"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
      {config.text}
    </span>
  );
};

const SubscriptionHistory: React.FC<SubscriptionHistoryProps> = ({ subscriptions }) => {
    const head = ["Plan", "Date de début", "Date de fin", "Statut"];
 
    const tableData: TransformedData[] = subscriptions.map(subscription => ({
        id: subscription.id,
        plan: subscription.subscriptionPlan.name,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        statut: StatutDisplay(subscription.status)
    }));

    return (
        <div className="w-full">
            <Table head={head} data={tableData} variant={"Default"} />
        </div>
    );
}

export default SubscriptionHistory;
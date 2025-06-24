import { Filter, X } from "lucide-react";
import { DynamicPartner } from "@/services/api/partner/types";
import Select from "@/components/ui/Select";
import { DeliveryStatus, PaymentStatus } from "@/types";
import SearchPartner from "@/components/order/consultOrders/SearchPartner";

type ClientOrdersFilterProps = {
    client:DynamicPartner | undefined
    setClient: (client: DynamicPartner | undefined) => void;
    setPaymentStatus: (status: PaymentStatus) => void;
    PaymentStatus: PaymentStatus;
    setDeliveryStatus: (status: DeliveryStatus) => void;
    DeliveryStatus: DeliveryStatus;
    updateSearchParams: (params: any) => void;
}

const ClientOrdersFilter: React.FC<ClientOrdersFilterProps> = ({
    client,
    setClient,
    setPaymentStatus,
    PaymentStatus,
    setDeliveryStatus,
    DeliveryStatus,
    updateSearchParams
}) => {

    const PaymentStatusMap = new Map<string, string>([
        ["", "Tous"],
        ["PAID", "Commandes payées"],
        ["UNPAID", "Commandes non payées"]
    ]);

    const DeliveryStatusMap = new Map<string, string>([
        ["", "Tous"],
        ["DELIVERED", "Commandes livrées"],
        ["UNDELIVERED", "Commandes non livrées"]
    ]);

   const handleReset = () => {
        // Réinitialiser tous les filtres à leur valeur par défaut
        setClient(undefined);
        setPaymentStatus("" as PaymentStatus);
        setDeliveryStatus("" as DeliveryStatus);
        
        // Clear all filter-related URL parameters
        updateSearchParams({
            partnerId: '',
            paymentStatus: '',
            deliveryStatus: '',
            page: '0' // Reset to first page as well
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filtres
                </h3>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-4 items-end">
                <div className="w-full lg:w-2/4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Recherche
                    </label>
                    <SearchPartner partnerType={"CLIENT"} setPartner={setClient} partner={client} />
                </div>

                <div className="w-full lg:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        État du paiement
                    </label>
                    <Select
                        mapOptions={PaymentStatusMap}
                        setOption={setPaymentStatus}
                        selectedOption={PaymentStatus}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
                    />
                </div>

                <div className="w-full lg:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        État de la livraison
                    </label>
                    <Select
                        mapOptions={DeliveryStatusMap}
                        setOption={setDeliveryStatus}
                        selectedOption={DeliveryStatus}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
                    />
                </div>

                <div className="flex gap-2 mt-2 lg:mt-0">
                    <button
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg transition-all text-sm font-medium flex items-center gap-1"
                        onClick={handleReset}
                    >
                        <X />
                        Réinitialiser
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientOrdersFilter;
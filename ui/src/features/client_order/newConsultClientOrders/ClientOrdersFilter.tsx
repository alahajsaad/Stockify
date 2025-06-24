// components/ClientOrdersFilter.tsx
import { Filter, X } from "lucide-react";
import Select from "@/components/ui/Select";
import SearchPartner from "@/components/order/consultOrders/SearchPartner";
import { useClientOrdersFilter } from "./ClientOrdersFilterContext";
import { DeliveryStatus, PaymentStatus } from "@/types";

const PaymentStatusMap = new Map([
  ["", "Tous"],
  ["PAID", "Commandes payées"],
  ["UNPAID", "Commandes non payées"],
]);

const DeliveryStatusMap = new Map([
  ["", "Tous"],
  ["DELIVERED", "Commandes livrées"],
  ["UNDELIVERED", "Commandes non livrées"],
]);

const ClientOrdersFilter = () => {
  const {
    partner,
    setPartner,
    paymentStatus,
    setPaymentStatus,
    deliveryStatus,
    setDeliveryStatus,
    updateSearchParams,
  } = useClientOrdersFilter();

  const handleReset = () => {
    setPartner(undefined);
    setPaymentStatus("" as PaymentStatus);
    setDeliveryStatus("" as DeliveryStatus);
    updateSearchParams({
      partnerId: "",
      paymentStatus: "",
      deliveryStatus: "",
      page: "0",
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
          <SearchPartner partnerType="CLIENT" setPartner={setPartner} partner={partner} />
        </div>

        <div className="w-full lg:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-2">État du paiement</label>
          <Select mapOptions={PaymentStatusMap} setOption={setPaymentStatus} selectedOption={paymentStatus} />
        </div>

        <div className="w-full lg:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-2">État de la livraison</label>
          <Select mapOptions={DeliveryStatusMap} setOption={setDeliveryStatus} selectedOption={deliveryStatus} />
        </div>

        <div className="flex gap-2 mt-2 lg:mt-0">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-1" onClick={handleReset}>
            <X />
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientOrdersFilter;

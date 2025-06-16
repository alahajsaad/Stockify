import { DynamicPartner } from "@/services/api/partner/types";
import { Building2, PackageMinus } from "lucide-react";
import { useEffect, useState } from "react";
import TableNav from "@/components/ui/TableNav";
import { DeliveryStatus, PaymentStatus } from "@/types";
import { GetClientOrdersParams } from "@/services/api/ClientOrder/types";
import ClientOrdersFilter from "../components/ClientOrdersFilter";
import ClientOrdersTable from "../components/ClientOrdersTable";
import { useGetClientOrders } from "@/services/api/ClientOrder/hooks";



const ConsultClientOrders : React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [partner, setPartner] = useState<DynamicPartner>();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>();
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>();

  // Construire les paramètres de filtre
  const filter: GetClientOrdersParams = {
    page,
    size,
    partnerId:partner?.id,
    paymentStatus: paymentStatus || undefined,
    deliveryStatus: deliveryStatus || undefined,
  };

  const { data:clientOrders, isPending, refetch } = useGetClientOrders(filter);

  useEffect(() => {
    refetch();
  }, [partner, paymentStatus, deliveryStatus, page, refetch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <PackageMinus className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commandes clients</h1>
          <p className="text-gray-600 mt-1">
            Gérez les commandes clients
          </p>
        </div>
      </div>

      <ClientOrdersFilter
        setClient={setPartner}
        PaymentStatus={paymentStatus}
        DeliveryStatus={deliveryStatus}
        setPaymentStatus={setPaymentStatus}
        setDeliveryStatus={setDeliveryStatus}
      />

      {isPending ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : clientOrders && clientOrders.content.length > 0 ? (
        <>
         <ClientOrdersTable data={clientOrders.content} />
         <TableNav data={clientOrders} page={page} setPage={setPage} />
        </>
       
      ) : (
        <div className="text-center py-8">
          <PackageMinus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune commande client trouvée.</p>
        </div>
      )}
    </div>
  );
};


export default ConsultClientOrders ;
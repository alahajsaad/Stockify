import { DynamicPartner, PartnerResponseDto } from "@/services/api/partner/types";
import { GetSupplierOrdersParams } from "@/services/api/supplier_order/types";
import { PackagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import SupplierOrdersFilter from "../components/SupplierOrdersFilter";
import OrdersTable from "../components/OrdersTable";
import { useGetSupplierOrders } from "@/services/api/supplier_order/hooks";
import TableNav from "@/components/ui/TableNav";
import { PaymentStatus, ReceptionStatus } from "@/types";



const ConsultSupplierOrders : React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [partner, setPartner] = useState<DynamicPartner>();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | undefined>();
  const [receptionStatus, setReceptionStatus] = useState<ReceptionStatus | undefined>();

  // Construire les paramètres de filtre
  const filter: GetSupplierOrdersParams = {
    page,
    size,
    partnerId:partner?.id,
    paymentStatus: paymentStatus ,
    receptionStatus: receptionStatus ,
  };

  const { data:supplierOrders, isPending, refetch } = useGetSupplierOrders(filter);

  useEffect(() => {
    refetch();
  }, [partner, paymentStatus, receptionStatus, page, refetch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <PackagePlus className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commandes fournisseurs</h1>
          <p className="text-gray-600 mt-1">
            Gérez les commandes fournisseurs
          </p>
        </div>
      </div>

      <SupplierOrdersFilter
        setSupplier={setPartner}
        PaymentStatus={paymentStatus}
        ReceptionStatus={receptionStatus}
        setPaymentStatus={setPaymentStatus}
        setReceptionStatus={setReceptionStatus}
      />

      {isPending ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : supplierOrders && supplierOrders.content.length > 0 ? (
        <>
         <OrdersTable data={supplierOrders.content} />
         <TableNav data={supplierOrders} page={page} setPage={setPage} />
        </>
       
      ) : (
        <div className="text-center py-8">
          <PackagePlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune commande fournisseur trouvée.</p>
        </div>
      )}
    </div>
  );
};


export default ConsultSupplierOrders ;
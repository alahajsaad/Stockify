// ConsultSupplierOrder.tsx
import { useGetSupplierOderById } from "@/services/api/supplier_order/hooks";
import { useParams } from "react-router-dom";
import OrderHeader from "../ConsultSupplierOrderComponents/OrderHeader";
import { SupplierOrderFullDto, OrderLineRecord } from "@/services/api/supplier_order/types";
import { useState, useEffect } from "react";
import OrderLines from "../ConsultSupplierOrderComponents/OrderLines";

const ConsultSupplierOrder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : -1;
    const { data: supplierOrder, isPending, isError } = useGetSupplierOderById(numericId);
    const [updatedSupplierOrder, setUpdatedSupplierOrder] = useState<SupplierOrderFullDto | undefined>(supplierOrder);
   console.log(updatedSupplierOrder)
    useEffect(() => {
        if (supplierOrder) {
            setUpdatedSupplierOrder(supplierOrder);
        }
    }, [supplierOrder]);
   
    const handleOrderLinesUpdate = (orderLines: OrderLineRecord) => {
        if (updatedSupplierOrder) {
            setUpdatedSupplierOrder({
                ...updatedSupplierOrder,
                supplierOrderLine: orderLines
            });
        }
    };
   
    if (isPending) {
        return <p>Chargement...</p>;
    }
   
    if (isError || !supplierOrder) {
        return <p>Cette commande fournisseur n'a pas été trouvée</p>;
    }
   
    return (
        <>
            <OrderHeader orderData={updatedSupplierOrder || supplierOrder} />
            <OrderLines
                orderLinesRecord={updatedSupplierOrder?.supplierOrderLine || supplierOrder.supplierOrderLine}
                setOrderLines={handleOrderLinesUpdate}
            />
        </>
    );
}

export default ConsultSupplierOrder;
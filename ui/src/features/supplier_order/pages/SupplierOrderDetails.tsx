// SupplierOrderDetails.tsx
import { useGetSupplierOderById, useUpdateSupplierOrder } from "@/services/api/supplier_order/hooks";
import { useParams } from "react-router-dom";
import OrderHeader from "../ConsultSupplierOrderComponents/OrderHeader";
import { SupplierOrderFullDto } from "@/services/api/supplier_order/types";
import { useState, useEffect, useCallback } from "react";
import OrderLines from "../ConsultSupplierOrderComponents/OrderLines";
import { toast } from "react-toastify";
import { OrderLineRecord, PaymentStatus, ReceptionStatus } from "@/types";

const SupplierOrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : -1;
    const { data: supplierOrder, isPending, isError } = useGetSupplierOderById(numericId);
    const [updatedSupplierOrder, setUpdatedSupplierOrder] = useState<SupplierOrderFullDto | undefined>(undefined);
    const {mutate:updateSupplierOrder , isPending : isUpdating } = useUpdateSupplierOrder()
    console.log(updatedSupplierOrder)
    
   const handleUpdateSupplierOrder = () => {
    if (!updatedSupplierOrder) {
        console.warn('No supplier order to update');
        return;
    }

    const orderToUpdate: SupplierOrderFullDto = {
        ...updatedSupplierOrder,
        // Deep copy the supplierOrderLine to avoid mutation issues
        supplierOrderLine: { ...updatedSupplierOrder.supplierOrderLine }
    };

    // Process DO_SAVE items - set id to null for new items
    if (orderToUpdate.supplierOrderLine.DO_SAVE?.length > 0) {
        orderToUpdate.supplierOrderLine.DO_SAVE = orderToUpdate.supplierOrderLine.DO_SAVE.map(orderLine => ({
            ...orderLine,
            id: null
        }));
    }

    // Remove DO_NOTHING items as they don't need to be sent to the server
    if (orderToUpdate.supplierOrderLine.DO_NOTHING) {
        delete orderToUpdate.supplierOrderLine.DO_NOTHING;
    }

    

    // Call the update function
    updateSupplierOrder(orderToUpdate,{
        onSuccess:(response)=>{
            toast.success(response.message)
        }
    });
};


    // Initialize state when supplierOrder data is loaded
    useEffect(() => {
        if (supplierOrder) {
            setUpdatedSupplierOrder(supplierOrder);
        }
    }, [supplierOrder]);

    const handleOrderLinesUpdate = useCallback((orderLines: OrderLineRecord) => {
        setUpdatedSupplierOrder(prevState => {
            if (!prevState) return prevState;
            
            return {
                ...prevState,
                supplierOrderLine: orderLines
            };
        });
    }, []);

    const updatePaymentStatus = useCallback((paymentStatus: PaymentStatus) => {
        setUpdatedSupplierOrder(prevState => {
            if (!prevState) {
                console.warn('Aucune commande fournisseur sélectionnée.');
                return prevState;
            }

            // Only update if the status is actually different
            if (prevState.paymentStatus === paymentStatus) {
                return prevState;
            }

            console.log(`Payment status updated from ${prevState.paymentStatus} to ${paymentStatus}`);
            
            return {
                ...prevState,
                paymentStatus
            };
        });
    }, []);

    const updateReceptionStatus = useCallback((receptionStatus: ReceptionStatus) => {
        setUpdatedSupplierOrder(prevState => {
            if (!prevState) {
                console.warn('Aucune commande fournisseur sélectionnée.');
                return prevState;
            }

            // Only update if the status is actually different
            if (prevState.receptionStatus === receptionStatus) {
                return prevState;
            }

            console.log(`Reception status updated from ${prevState.receptionStatus} to ${receptionStatus}`);
            
            return {
                ...prevState,
                receptionStatus
            };
        });
    }, []);

    if (isPending) {
        return <p>Chargement...</p>;
    }

    if (isError || !supplierOrder) {
        return <p>Cette commande fournisseur n'a pas été trouvée</p>;
    }

    // Use updatedSupplierOrder if available, otherwise fall back to original data
    const orderData = updatedSupplierOrder || supplierOrder;

    return (
        <>
            <OrderHeader 
                updatePaymentStatus={updatePaymentStatus} 
                updateReceptionStatus={updateReceptionStatus} 
                updateSupplierOrder={handleUpdateSupplierOrder}
                isPending={isUpdating}
                orderData={orderData} 
            />
            <OrderLines
                orderLinesRecord={orderData.supplierOrderLine}
                setOrderLines={handleOrderLinesUpdate}
            />
            
        </>
    );
};

export default SupplierOrderDetails;
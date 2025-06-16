// SupplierOrderDetails.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { DeliveryStatus, OrderLineRecord, PaymentStatus } from "@/types";
import { ClientOrderFullDto } from "@/services/api/ClientOrder/types";
import OrderLines from "@/components/order/orderDetails/OrderLines";
import { useGetClientOrderById, useUpdateClientOrder } from "@/services/api/ClientOrder/hooks";

const ClientOrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : -1;

    const { data: clientOrder, isPending, isError } = useGetClientOrderById(numericId);
    const [updatedClientOrder, setUpdatedClientOrder] = useState<ClientOrderFullDto | undefined>(undefined);
    const {mutate:updateClientOrder , isPending : isUpdating } = useUpdateClientOrder()
    
    
   const handleUpdateSupplierOrder = () => {
    if (!updatedClientOrder) {
        console.warn('No client order to update');
        return;
    }

    const orderToUpdate: ClientOrderFullDto = {
        ...updatedClientOrder,
        // Deep copy the supplierOrderLine to avoid mutation issues
        clientOrderLine: { ...updatedClientOrder.clientOrderLine }
    };

    // Process DO_SAVE items - set id to null for new items
    if (orderToUpdate.clientOrderLine.DO_SAVE?.length > 0) {
        orderToUpdate.clientOrderLine.DO_SAVE = orderToUpdate.clientOrderLine.DO_SAVE.map(orderLine => ({
            ...orderLine,
            id: null
        }));
    }

    // Remove DO_NOTHING items as they don't need to be sent to the server
    if (orderToUpdate.clientOrderLine.DO_NOTHING) {
        delete orderToUpdate.clientOrderLine.DO_NOTHING;
    }

    

    // Call the update function
    updateClientOrder(orderToUpdate,{
        onSuccess:(response)=>{
            toast.success(response.message)
        }
    });
};


    // Initialize state when supplierOrder data is loaded
    useEffect(() => {
        if (clientOrder) {
            setUpdatedClientOrder(clientOrder);
        }
    }, [clientOrder]);

    const handleOrderLinesUpdate = useCallback((orderLines: OrderLineRecord) => {
        setUpdatedClientOrder(prevState => {
            if (!prevState) return prevState;
            
            return {
                ...prevState,
                clientOrderLine: orderLines
            };
        });
    }, []);

    const updatePaymentStatus = useCallback((paymentStatus: PaymentStatus) => {
        setUpdatedClientOrder(prevState => {
            if (!prevState) {
                console.warn('Aucune commande client sélectionnée.');
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

    const updateDeliveryStatus = useCallback((deliveryStatus: DeliveryStatus) => {
        setUpdatedClientOrder(prevState => {
            if (!prevState) {
                console.warn('Aucune commande client sélectionnée.');
                return prevState;
            }

            // Only update if the status is actually different
            if (prevState.deliveryStatus === deliveryStatus) {
                return prevState;
            }

            console.log(`Reception status updated from ${prevState.deliveryStatus} to ${deliveryStatus}`);
            
            return {
                ...prevState,
                deliveryStatus
            };
        });
    }, []);

    if (isPending) {
        return <p>Chargement...</p>;
    }

    if (isError || !clientOrder) {
        return <p>Cette commande fournisseur n'a pas été trouvée</p>;
    }

    // Use updatedSupplierOrder if available, otherwise fall back to original data
    const orderData = updatedClientOrder || clientOrder;

    return (
        <>
            {/* <OrderHeader 
                updatePaymentStatus={updatePaymentStatus} 
                updateReceptionStatus={updateDeliveryStatus} 
                updateSupplierOrder={handleUpdateSupplierOrder}
                isPending={isUpdating}
                orderData={orderData} 
            /> */}
            <OrderLines
                orderLinesRecord={orderData.clientOrderLine}
                setOrderLines={handleOrderLinesUpdate}
            />
            
        </>
    );
};

export default ClientOrderDetails;
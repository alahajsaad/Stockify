// AddClientOrder.tsx
import OrderInformation from "@/components/order/OrderInformation";
import DisplayOrderLines from "@/components/order/orderLines/DisplayOrderLines";
import PartnerInformation from "@/components/order/PartnerInformation";
import { Button } from "@/components/ui";
import { useAddClientOrder, useGetClientOrderNumber } from "@/services/api/ClientOrder/hooks";
import { ClientOrder } from "@/services/api/ClientOrder/types";
import { DynamicPartner } from "@/services/api/partner/types";
import { OrderLineDto } from "@/types";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const AddClientOrder: React.FC = () => {
    const [orderLines, setOrderLines] = useState<OrderLineDto[]>([]);
    const { mutate: addClientOrder, isPending } = useAddClientOrder();
    const [client, setClient] = useState<DynamicPartner | undefined>(undefined);
    
    const { data: orderNumber, isPending: isClientOrderNumberPending, refetch: refetchClientOrderNumber } = useGetClientOrderNumber();
  
    const isFormValid = useMemo(() => 
        client != undefined && orderLines.length > 0 && orderNumber != undefined,
        [client, orderLines.length, orderNumber]
    );

    
    const handleClientOrderCreation = () => {
        if (orderNumber && client) {
            const clientOrder: ClientOrder = {
                orderNumber: orderNumber,
                orderLines: orderLines.map(({ id, ...rest }) => rest),
                partner: { id: client.id, entityType: client.entityType }
            };

            console.log("client order:", clientOrder); // Fixed log message

            addClientOrder(clientOrder, {
                onSuccess(response) {
                    toast.success(response.message);
                    setClient(undefined); 
                    setOrderLines([]);
                    refetchClientOrderNumber();
                },
                onError: (error) => {
                    toast.error(`Erreur lors de la création: ${error.message}`);
                }
            });
        }
    };

    return (
        <div className="">
            <OrderInformation orderNumber={orderNumber} isPending={isClientOrderNumberPending} />
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1 h-full">
                    <PartnerInformation partner={client} setPartner={setClient} partnerType={"CLIENT"} />
                </div>
                <div className="lg:col-span-2 h-full">
                    <DisplayOrderLines orderLines={orderLines} setOrderLines={setOrderLines} orderLineType={"client_order"} />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button 
                    disabled={!isFormValid || isPending} 
                    onClick={handleClientOrderCreation}
                >
                    {isPending ? 'Ajout en cours...' : 'Ajouter Commande client'}
                </Button>
            </div>
        </div>
    );
};

export default AddClientOrder;
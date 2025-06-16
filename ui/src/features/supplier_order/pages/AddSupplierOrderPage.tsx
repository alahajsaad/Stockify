import { useMemo, useState } from "react";
import { useAddSupplierOrder } from "@/services/api/supplier_order/hooks";
import { Button } from "@/components/ui";
import { SupplierOrderCreationDto } from "@/services/api/supplier_order/types";
import { useGetNewOrderNumber } from "@/services/api/supplier_order/hooks";
import { toast } from "react-toastify";
import {  DynamicPartner } from "@/services/api/partner/types";
import OrderInformation from "@/components/order/OrderInformation";
import PartnerInformation from "@/components/order/PartnerInformation";
import DisplayOrderLines from "@/components/order/orderLines/DisplayOrderLines";
import { OrderLineDto } from "@/types";



const AddSupplierOrderPage : React.FC = () => {
    const [orderLines, setOrderLines] = useState<OrderLineDto[]>([]);
    const {mutate : addSupplierOrder , isPending} = useAddSupplierOrder()
    const [supplier,setSupplier] = useState<DynamicPartner |undefined>(undefined)
    
    const {data:orderNumber , isPending:isNewOrderNumberPending , refetch : refetchNewOrderNumber} = useGetNewOrderNumber()
    console.log("order_number:"+orderNumber)
    const isFormValid = useMemo(() => 
        supplier != undefined  && orderLines.length > 0 && orderNumber != undefined,
        [supplier, orderLines.length,orderNumber]
    );

   
   
    const handleSupplierOrderCreation = () => {
            if(orderNumber&&supplier){
            const supplierOrder : SupplierOrderCreationDto = {
                orderNumber:orderNumber,
                orderLines:orderLines.map(({ id, ...rest }) => rest),
                partner:{id:supplier.id , entityType:supplier.entityType}

            }
            console.log("supplier order :" + supplierOrder)
            addSupplierOrder(supplierOrder,
                {
                    onSuccess(response) {
                        toast.success(response.message)
                        setSupplier(undefined); 
                        setOrderLines([])
                        refetchNewOrderNumber()


                    },
                    onError: (error) => {
                    toast.error(`Erreur lors de la création: ${error.message}`);
            }
                }
            )
            }
           
    }
    return (
        <div className="">
            <OrderInformation orderNumber={orderNumber} isPending={isNewOrderNumberPending} />
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1 h-full">
                    <PartnerInformation partner={supplier} setPartner={setSupplier} partnerType={"SUPPLIER"} />
                </div>
                <div className="lg:col-span-2 h-full">
                    <DisplayOrderLines orderLines={orderLines} setOrderLines={setOrderLines} orderLineType={"supplier_order"}/>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button 
                    disabled={!isFormValid || isPending} 
                    onClick={handleSupplierOrderCreation}
                   
                >
                    {isPending ? 'Ajout en cours...' : 'Ajouter Commande fournisseur'}
                </Button>
            </div>
        </div>
    );
}
export default AddSupplierOrderPage ;


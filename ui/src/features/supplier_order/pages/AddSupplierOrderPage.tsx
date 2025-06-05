import { useMemo, useState } from "react";
import SupplierInformation from "../components/SupplierInformation";
import OrderInformation from "../components/OrderInformation";
import { useAddSupplierOrder } from "@/services/api/supplier_order/hooks";
import { Button } from "@/components/ui";
import { OrderLine } from "@/types/supplierOrder";
import { SupplierOrderCreationDto } from "@/services/api/supplier_order/types";
import { useGetNewOrderNumber } from "@/services/api/supplier_order/hooks";
import { toast } from "react-toastify";
import DisplayOrderLines from "../components/orderLines/DisplayOrderLines";
import {  PartnerResponseDto } from "@/services/api/partner/types";



const AddSupplierOrderPage : React.FC = () => {
    const [orderLines, setOrderLines] = useState<OrderLine[]>([]);
    const {mutate : addSupplierOrder , isPending} = useAddSupplierOrder()
    const [supplier,setSupplier] = useState<PartnerResponseDto |undefined>(undefined)
    
    const {data:orderNumber , isPending:isNewOrderNumberPending , refetch : refetchNewOrderNumber} = useGetNewOrderNumber()
    console.log("order_number:"+orderNumber)
    const isFormValid = useMemo(() => 
        supplier != undefined  && orderLines.length > 0 && orderNumber != undefined,
        [supplier, orderLines.length,orderNumber]
    );

   
    const updateOrderLines = (orderLine:OrderLine) => {
        setOrderLines((prev)=>[...prev , orderLine])
    }
    const handleSupplierOrderCreation = () => {
            if(orderNumber&&supplier){
            const supplierOrder : SupplierOrderCreationDto = {
                orderNumber:orderNumber,
                orderLines:orderLines,
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
                    <SupplierInformation supplier={supplier} setSupplier={setSupplier} />
                </div>
                <div className="lg:col-span-2 h-full">
                    <DisplayOrderLines orderLines={orderLines} setOrderLines={updateOrderLines}/>
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


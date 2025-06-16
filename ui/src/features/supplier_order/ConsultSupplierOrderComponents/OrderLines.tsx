// OrderLines.tsx
import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";
import { OrderLine} from "@/services/api/supplier_order/types";
import { useState } from "react";
import EditOrderLine from "./EditOrderLine";
import { Button } from "@/components/ui";
import FinancialSummary from "./FinancialSummary";
import { OrderLineDto, OrderLineRecord } from "@/types";
import AddOrderLine from "@/components/order/orderLines/AddOrderLine";

export type TransformedOrderLineData = {
    id: number;
    reference: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
    totalTTC: number;
    vat: number;
};

type OrderLinesProps = {
    orderLinesRecord: OrderLineRecord
    setOrderLines: (orderLines: OrderLineRecord) => void
}

const OrderLines = ({ orderLinesRecord, setOrderLines }: OrderLinesProps) => {
    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState<boolean>(false)
    const [toEditOrderLine, setToEditOrderLine] = useState<TransformedOrderLineData>()
    const [isOpenPopupAdd, setIsOpenPopupAdd] = useState<boolean>(false)
    
   
    const head = ["Référence", "Nom du produit", "Quantité", "Prix unitaire", "Total", "Total TTC", "TVA"];
    
    const onEdit = (orderLine: TransformedOrderLineData) => {
        setToEditOrderLine(orderLine)
        setIsOpenPopupEdit(true)
    }
    
    const onSuccessEdit = (updatedOrderLine: TransformedOrderLineData) => {
        if (!orderLinesRecord) return;
        
        const newOrderLines = { ...orderLinesRecord };
            
        // Find and update the order line
        for (const [action, orderLineDtos] of Object.entries(newOrderLines)) {
            const orderLines = Array.isArray(orderLineDtos) ? orderLineDtos : [];
            const orderLineIndex = orderLines.findIndex((dto: any) => dto.id === updatedOrderLine.id);
            
            if (orderLineIndex !== -1) {
                const updatedOrderLineDto = {
                    ...orderLines[orderLineIndex],
                    quantity: updatedOrderLine.quantity,
                    unitPrice: updatedOrderLine.unitPrice
                };
                
                // Remove the old entry
                delete newOrderLines[action as keyof OrderLineRecord];
                
                // Add with DO_UPDATE action (unless it was already DO_SAVE for new items)
                const newAction = action === "DO_SAVE" ? "DO_SAVE" : "DO_UPDATE";
                
                // Create new array with updated order line
                const updatedOrderLineDtos = [...orderLines];
                updatedOrderLineDtos[orderLineIndex] = updatedOrderLineDto;
                
                newOrderLines[newAction as keyof OrderLineRecord] = updatedOrderLineDtos;
                break;
            }
        }
        
        // Update the order lines
        setOrderLines(newOrderLines);
        
        // Close modal
        setToEditOrderLine(undefined);
        setIsOpenPopupEdit(false);
    }
    
    const onCancelEdit = () => {
        setToEditOrderLine(undefined);
        setIsOpenPopupEdit(false);
    }
    
    const onDelete = (id: number) => {
        if (!orderLinesRecord) return;
        
        const newOrderLines = { ...orderLinesRecord };
        
        // Find and update the action to DO_REMOVE
        for (const [action, orderLineDtos] of Object.entries(newOrderLines)) {
            const orderLines = Array.isArray(orderLineDtos) ? orderLineDtos : [];
            const orderLineIndex = orderLines.findIndex(dto => dto.id === id);
            
            if (orderLineIndex !== -1) {
                const orderLineToRemove = orderLines[orderLineIndex];
                
                // Remove from current array
                const updatedOrderLineDtos = orderLines.filter(dto => dto.id !== id);
                
                // Update or remove the current action entry
                if (updatedOrderLineDtos.length > 0) {
                    newOrderLines[action as keyof OrderLineRecord] = updatedOrderLineDtos;
                } else {
                    delete newOrderLines[action as keyof OrderLineRecord];
                }
                
                // Only add DO_REMOVE if it's not a new item (DO_SAVE)
                if (action !== "DO_SAVE") {
                    const existingRemoveItems = newOrderLines.DO_REMOVE || [];
                    newOrderLines.DO_REMOVE = [...existingRemoveItems, orderLineToRemove];
                }
                break;
            }
        }
        
        setOrderLines(newOrderLines);
    }
    
    const getOrderLinesEntries = () => {
        if (!orderLinesRecord) return [];
        return Object.entries(orderLinesRecord);
    };

    const onAddingNewOrderLine = (orderLine: OrderLine) => {
        if (!orderLinesRecord) return;
        
        const newOrderLines = { ...orderLinesRecord };
        
        // Create the new OrderLineDto object
        const newOrderLineDto: OrderLineDto = {
            id: Date.now(), // Generate temporary ID for new items
            quantity: orderLine.quantity,
            unitPrice: orderLine.unitPrice,
            product: orderLine.product
        };
        
        // Get existing DO_SAVE items or create empty array
        const existingSaveItems = newOrderLines.DO_SAVE || [];
        
        // Add the new order line to DO_SAVE action
        newOrderLines.DO_SAVE = [...existingSaveItems, newOrderLineDto];
        
        // Update the order lines
        setOrderLines(newOrderLines);
        
        // Close the modal
        setIsOpenPopupAdd(false);
    }
    
    const tableData: TransformedOrderLineData[] = getOrderLinesEntries()
        .flatMap(([action, orderLineDtos]) => {
            // Skip DO_REMOVE entries for display
            if (action === "DO_REMOVE") return [];
            
            // Ensure orderLineDtos is an array
            const orderLines = Array.isArray(orderLineDtos) ? orderLineDtos : [];
            
            return orderLines.map(orderLine => {
                const { product, quantity, unitPrice } = orderLine;
                const total = quantity * unitPrice;
                const totalTTC = parseFloat((total * (1 + product.vat.rate / 100)).toFixed(2));

                console.log("product.vat.rate:" + product.vat.rate)
                return {
                    id: orderLine.id,
                    reference: product.reference,
                    productName: product.designation,
                    quantity,
                    unitPrice,
                    total,
                    totalTTC,
                    vat: product.vat.rate,
                };
            });
        });

        const financialSummary = tableData.reduce(
    (acc, row) => ({
        THT: acc.THT + row.total,
        TTC: acc.TTC + row.totalTTC
    }),
    { THT: 0, TTC: 0 }
);
    return (
        <>
            <div className="flex items-center justify-between mt-2 mb-2">
                <h2 className="text-2xl font-bold">lignes de Commande</h2>
                <Button 
                    type="button" 
                    onClick={() => setIsOpenPopupAdd(true)}
                >
                    Ajouter
                </Button>
            </div>
            <Table 
                head={head} 
                data={tableData} 
                variant="WithActions" 
                onEdit={onEdit}
                onDelete={onDelete}
            />

           <FinancialSummary financialSummary={financialSummary} />
                    
            <Modal
                title="Modifier ligne de commande"
                isOpen={isOpenPopupEdit}
                onClose={onCancelEdit}
                size="md"
            >
                {toEditOrderLine && (
                    <EditOrderLine 
                        orderLine={toEditOrderLine} 
                        onSuccess={onSuccessEdit}
                        onCancel={onCancelEdit}
                    />
                )}
            </Modal>

            <Modal 
                title="Ajouter ligne de commande" 
                isOpen={isOpenPopupAdd} 
                onClose={() => setIsOpenPopupAdd(false)} 
                size="lg"
            >
                <AddOrderLine onAddingNewOrderLine={onAddingNewOrderLine} orderLineType={"supplier_order"}/>
            </Modal>
        </>
    );
};

export default OrderLines;
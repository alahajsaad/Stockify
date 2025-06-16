// DisplayOrderLines.tsx
import { useMemo, useState } from "react";
import { Button } from "@/components/ui"; // Fixed import path
import { Card, CardBody, CardHeader } from "@/components/ui/Card"; // Fixed import path
import Modal from "@/components/ui/Modal"; // Fixed import path
import AddOrderLine from "./AddOrderLine";
import Table from "@/components/ui/Table";
import { OrderLineDto, OrderLineType } from "@/types";

type DisplayOrderLine = {
    id: number;
    designation: string;
    quantity: number;
    unitPrice: number;
    total: number;
};

type OrderDetailsProps = {
    orderLines: OrderLineDto[];
    setOrderLines: (orderLine: OrderLineDto[]) => void;
    orderLineType: OrderLineType;
};

const DisplayOrderLines: React.FC<OrderDetailsProps> = ({ orderLines, setOrderLines, orderLineType }) => {
    const [isOpenAddOrderLine, setIsOpenAddOrderLine] = useState<boolean>(false);
    
    const onAddingNewOrderLine = (orderLine: OrderLineDto) => {
        setOrderLines([...orderLines, orderLine]);
        setIsOpenAddOrderLine(false);
    };
   
    const onDelete = (id: number) => {
        const updatedOrderLines = orderLines.filter(orderLine => orderLine.id !== id);
        setOrderLines(updatedOrderLines);
    };
   
    // Memoized calculations - Fixed syntax error
    const { tableData, totalAmount } = useMemo(() => {
        const data: DisplayOrderLine[] = orderLines.map((order) => ({
            id: order.id,
            designation: order.product.designation,
            quantity: order.quantity,
            unitPrice: order.unitPrice,
            total: order.quantity * order.unitPrice
        })); // Fixed: moved dependency array outside of map function
        
        const total = data.reduce((sum, item) => sum + item.total, 0);
        return { tableData: data, totalAmount: total };
    }, [orderLines]);
    
    const head = ["Désignation", "Quantité", "Prix unitaire", "Total"];
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold">Détails de la commande</h2>
                <Button onClick={() => { setIsOpenAddOrderLine(true); }}>
                    Ajouter ligne de commande
                </Button>
            </CardHeader>
            <CardBody>
                {orderLines.length > 0 ? (
                    <div className="space-y-4">
                        <Table
                            head={head}
                            data={tableData}
                            variant="WithActions"
                            onDelete={onDelete}
                        />
                       
                        <div className="flex justify-end border-t pt-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Total articles: {orderLines.length}</p>
                                <p className="text-lg font-semibold">
                                    Total: {totalAmount.toFixed(2)} €
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>Aucune ligne de commande ajoutée</p>
                        <p className="text-sm">Cliquez sur "Ajouter ligne de commande" pour commencer</p>
                    </div>
                )}
            </CardBody>
         
            <Modal
                title="Ajouter ligne de commande"
                isOpen={isOpenAddOrderLine}
                onClose={() => setIsOpenAddOrderLine(false)}
                size="lg"
            >
                <AddOrderLine onAddingNewOrderLine={onAddingNewOrderLine} orderLineType={orderLineType} />
            </Modal>
        </Card>
    );
};

export default DisplayOrderLines;
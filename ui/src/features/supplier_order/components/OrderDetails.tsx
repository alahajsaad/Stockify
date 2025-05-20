import { useState } from "react";
import { Button } from "src/components/ui";
import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import Modal from "src/components/ui/Modal";
import AddOrderLine from "./AddOrderLine";
import { OrderLine } from "src/types/supplierOrder";
import Table from "src/components/ui/Table";
import { useGetProductById } from "src/services/api/product";

type DisplayOrderLine = {
    designation:string
    quantity:number
    price:number
}

const OrderDetails : React.FC = () => {
    const [isOpenAddOrderLine , setIsOpenAddOrderLine] = useState<boolean>(false)
    const [orderLines , setOrderLines] = useState<OrderLine[]>()
   

    const onSuccess = (orderLine: OrderLine) => {
        setOrderLines([...orderLines, orderLine]);
        setIsOpenAddOrderLine(false)
    };
    const head = ["desgnation","quantite","prix unitaire"]
    // const tableData : DisplayOrderLine[] = orderLines?.map((line) => ({
    //     id:  ,
    //     designation : refetch(line.product.id, onSuccess((response) => response.designation)),
    //     quantity:line.quantity,
    //     price: line.unitPrice
        
    // }))
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold">Détails de la commande</h2>
                <Button onClick={()=>{setIsOpenAddOrderLine(true)}}>Ajouter ligne de commande</Button>
            </CardHeader>
            <CardBody>
                {orderLines ? 
                <div>
                    {/* <Table head={head} data={tableData} variant={"WithActions"}/> */}
                </div>
                :
                <div>
                     <p>ajouter des lignes de commande !</p>
                </div>}
           
            </CardBody>
          
            <Modal title="Ajouter ligne de commande" isOpen={isOpenAddOrderLine} onClose={() => setIsOpenAddOrderLine(false)} size="lg">
                    <AddOrderLine onSuccess={onSuccess}/>
            </Modal>
        </Card>
    );
}
export default OrderDetails ;
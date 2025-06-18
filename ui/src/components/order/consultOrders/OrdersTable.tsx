import { Badge } from "@/components/ui/shadcn/badge";
import Table from "@/components/ui/Table";
import { getStatusStyle, getStatusText } from "@/components/order/utils";
import { DynamicPartner } from "@/services/api/partner/types";
import {  SupplierOrderResponseDto } from "@/services/api/supplier_order/types";
import { PaymentStatus, ReceptionStatus } from "@/types";

type OrdersTableProps = {
  data: SupplierOrderResponseDto[];
};

type TransformedData = {
    id:number
    orderNumber:string
    partner:string
    status:JSX.Element
    totalExcludingTax:number
    totalIncludingTax:number
    

}
const OrdersTable : React.FC<OrdersTableProps> = ({data}) => {
     // En-têtes corrigés pour correspondre aux données des entreprises
  const head = ["N°Commande", "Partenaire", "Statut", "Total", "TotaleTTC"];

  const getPartner = (partner:DynamicPartner)=>{
       if(partner.entityType === "PERSON") {
         return partner.fullName
        } else {
            return partner.companyName
        }
  }

  const getStatus = (paymentStatus:PaymentStatus , receptionStatus:ReceptionStatus) =>{

        return (
            <div className="flex flec-col items-center justify-center gap-0.5">
            <Badge className={getStatusStyle(paymentStatus)}>
                {getStatusText(paymentStatus)}
            </Badge>
            <Badge className={getStatusStyle(receptionStatus)}>
                {getStatusText(receptionStatus)}
            </Badge>
            </div>
        )
  }
  // Transformer les données des entreprises
  const tableData: TransformedData[] = data.map(order => ({
    id: order.id,
    orderNumber:order.orderNumber,
    partner: getPartner(order.partner),
    status:getStatus(order.paymentStatus,order.receptionStatus),
    totalExcludingTax:order.totalExcludingTax,
    totalIncludingTax:order.totalIncludingTax

   
  }));

  return (
    <Table head={head} data={tableData} variant={"WithNavigation"}/>
  );
}
export default OrdersTable ;
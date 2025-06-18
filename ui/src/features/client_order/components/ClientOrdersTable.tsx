import { Badge } from "@/components/ui/shadcn/badge";
import Table from "@/components/ui/Table";
import { getStatusStyle, getStatusText } from "@/components/order/utils";
import { ClientOrderResponseDto } from "@/services/api/ClientOrder/types";
import { DynamicPartner } from "@/services/api/partner/types";
import { DeliveryStatus, PaymentStatus } from "@/types";

type OrdersTableProps = {
  data: ClientOrderResponseDto[];
};

type TransformedData = {
    id:number
    orderNumber:string
    partner:string
    status:JSX.Element
    totalExcludingTax:number
    totalIncludingTax:number
    

}
const ClientOrdersTable : React.FC<OrdersTableProps> = ({data}) => {
     // En-têtes corrigés pour correspondre aux données des entreprises
  const head = ["N°Commande", "Partenaire", "Statut", "Total", "TotaleTTC"];

  const getPartner = (partner:DynamicPartner)=>{
       if(partner.entityType === "PERSON") {
         return partner.fullName
        } else {
            return partner.companyName
        }
  }

  const getStatus = (paymentStatus:PaymentStatus , deliveryStatus:DeliveryStatus) =>{

        return (
            <div className="flex flec-col items-center justify-center gap-0.5">
            <Badge className={getStatusStyle(paymentStatus)}>
                {getStatusText(paymentStatus)}
            </Badge>
            <Badge className={getStatusStyle(deliveryStatus)}>
                {getStatusText(deliveryStatus)}
            </Badge>
            </div>
        )
  }
  // Transformer les données des entreprises
  const tableData: TransformedData[] = data.map(order => ({
    id: order.id,
    orderNumber:order.orderNumber,
    partner: getPartner(order.partner),
    status:getStatus(order.paymentStatus,order.deliveryStatus),
    totalExcludingTax:order.totalExcludingTax,
    totalIncludingTax:order.totalIncludingTax

   
  }));

  return (
    <Table head={head} data={tableData} variant={"WithNavigation"}/>
  );
}
export default ClientOrdersTable ;
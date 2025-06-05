import { Badge } from "@/components/ui/shadcn/badge";
import Table from "@/components/ui/Table";
import { DynamicPartner } from "@/services/api/partner/types";
import { PaymentStatus, ReceptionStatus, SupplierOrderResponseDto } from "@/services/api/supplier_order/types";

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
     const getStatusColor = (status: PaymentStatus | ReceptionStatus) => {
            switch (status) {
            case 'PAID':
                return 'bg-green-100 text-green-800';
            case 'RECEIVED':
                return 'bg-green-100 text-green-800';
            case 'UNPAID':
                return 'bg-red-100 text-red-800';
            case 'UNRECEIVED':
                return 'bg-red-100 text-red-800';
            }
      };
       const getStatusText = (status: PaymentStatus | ReceptionStatus) => {
            switch (status) {
            case 'PAID':
                return 'payer';
            case 'RECEIVED':
                return 'recu';
            case 'UNPAID':
                return 'ne pas payer';
            case 'UNRECEIVED':
                return 'ne pas recu';
            }
      };

        return (
            <div className="flex flec-col items-center justify-center gap-0.5">
            <Badge className={getStatusColor(paymentStatus)}>
                {getStatusText(paymentStatus)}
            </Badge>
            <Badge className={getStatusColor(receptionStatus)}>
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
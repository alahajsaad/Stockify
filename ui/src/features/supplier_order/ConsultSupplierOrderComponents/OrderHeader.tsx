import { Badge } from '@/components/ui/shadcn/badge';
import { Card , CardBody} from '@/components/ui/Card';
import { SupplierOrderFullDto } from '@/services/api/supplier_order/types';
import { Currency } from '@/lib/currency';
import { getStatusStyle, getStatusText } from '../utils';
import { DynamicPartner } from '@/services/api/partner/types';
import Select from '@/components/ui/Select';
import { Button } from '@/components/ui';
import { PaymentStatus, ReceptionStatus } from '@/types';

interface OrderHeaderProps {
  orderData: SupplierOrderFullDto
  updatePaymentStatus:(paymentStatus:PaymentStatus) =>void
  updateReceptionStatus:(receptionStatus:ReceptionStatus) =>void
  updateSupplierOrder:()=>void
  isPending:boolean
}

const OrderHeader = ({ orderData , updatePaymentStatus ,updateReceptionStatus , updateSupplierOrder ,isPending }: OrderHeaderProps) => {
  const taxAmount = orderData.totalIncludingTax - orderData.totalExcludingTax;

  const getPartnaireName = (partnaire : DynamicPartner) =>{
      if(partnaire.entityType === 'PERSON'){
        return partnaire.fullName
      } else {
        return partnaire.companyName
      }

  }

 const PaymentStatusMap = new Map<PaymentStatus, string>([
  ["PAID", "payé"],
  ["UNPAID", "non payé"],
]);

const ReceptionStatusMap = new Map<ReceptionStatus, string>([
  ["RECEIVED", "reçu"],
  ["UNRECEIVED", "non reçu"],
]);

 
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardBody className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-4">
  {/* Order information */}
  <div>
    <h1 className="text-3xl font-bold text-gray-900">
      Commande {orderData.orderNumber}
    </h1>

    <div className="flex flex-wrap gap-2 mt-2">
       <Select
          mapOptions={PaymentStatusMap}
          setOption={updatePaymentStatus}
          selectedOption={orderData.paymentStatus}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
         <Select
          mapOptions={ReceptionStatusMap}
          setOption={updateReceptionStatus}
          selectedOption={orderData.receptionStatus}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
      <Badge className={getStatusStyle(orderData.paymentStatus)}>
        {getStatusText(orderData.paymentStatus)}

      </Badge>
      <Badge className={getStatusStyle(orderData.receptionStatus)}>
        {getStatusText(orderData.receptionStatus)}
      </Badge>
    </div>
  </div>

  {/* Supplier information */}
  <div>
    <p className="font-semibold">Partenaire: <span className="font-normal">{getPartnaireName(orderData.partner)}</span></p>
    
    <div className="flex flex-wrap gap-1">
     <p className="font-semibold">Numéros de téléphone :</p>

      {orderData.partner.phoneNumbers.map((phoneNumber, index) => (
        <p key={phoneNumber.id || index}>{phoneNumber.number} /</p>
      ))}
    </div>
  </div>
</div>

      <Button onClick={updateSupplierOrder} disabled={isPending}>
        {isPending ? "en cour ..." : "Enregistrer les modifications"}
      </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderHeader;
import { Badge } from '@/components/ui/shadcn/badge';
import { Card , CardBody} from '@/components/ui/Card';
import { DynamicPartner } from '@/services/api/partner/types';
import Select from '@/components/ui/Select';
import { Button } from '@/components/ui';
import { DeliveryStatus, PaymentStatus } from '@/types';
import { ClientOrderFullDto } from '@/services/api/ClientOrder/types';
import { getStatusStyle, getStatusText } from '@/components/order/utils';

interface OrderHeaderProps {
  orderData: ClientOrderFullDto
  updatePaymentStatus:(paymentStatus:PaymentStatus) =>void
  updateDeliveryStatus:(deliveryStatus : DeliveryStatus) => void
  updateClientOrder:()=>void
  isPending:boolean
}

const ClientOrderHeader = ({ orderData , updatePaymentStatus ,updateDeliveryStatus , updateClientOrder ,isPending }: OrderHeaderProps) => {

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

const DeliveryStatusMap = new Map<DeliveryStatus, string>([
  ["DELIVERED", "livrée"],
  ["UNDELIVERED", "non livrée"],
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
          mapOptions={DeliveryStatusMap}
          setOption={updateDeliveryStatus}
          selectedOption={orderData.deliveryStatus}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700"
        />
      <Badge className={getStatusStyle(orderData.paymentStatus)}>
        {getStatusText(orderData.paymentStatus)}

      </Badge>
      <Badge className={getStatusStyle(orderData.deliveryStatus)}>
        {getStatusText(orderData.deliveryStatus)}
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

      <Button onClick={updateClientOrder} disabled={isPending}>
        {isPending ? "en cour ..." : "Enregistrer les modifications"}
      </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ClientOrderHeader;
import { Badge } from '@/components/ui/shadcn/badge';
import { Card , CardBody} from '@/components/ui/Card';
import { SupplierOrderFullDto } from '@/services/api/supplier_order/types';
import { Currency } from '@/lib/currency';
import { getStatusStyle, getStatusText } from '../utils';
import { DynamicPartner } from '@/services/api/partner/types';

interface OrderHeaderProps {
  orderData: SupplierOrderFullDto
}

const OrderHeader = ({ orderData }: OrderHeaderProps) => {
  const taxAmount = orderData.totalIncludingTax - orderData.totalExcludingTax;

  const getPartnaireName = (partnaire : DynamicPartner) =>{
      if(partnaire.entityType === 'PERSON'){
        return partnaire.fullName
      } else {
        return partnaire.companyName
      }

  }
 
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

                   
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Résumé Financier</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Hors Taxes :</span>
                <span className="font-semibold text-gray-900">{orderData.totalExcludingTax.toFixed(2)+" "+Currency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Montant des Taxes :</span>
                <span className="font-semibold text-gray-700">{taxAmount.toFixed(2)+" "+Currency}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Toutes Taxes Comprises :</span>
                  <span className="font-bold text-lg text-blue-600">{orderData.totalIncludingTax.toFixed(2) +" "+Currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderHeader;
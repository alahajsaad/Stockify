import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import { Hash, Calendar } from "lucide-react";

type OrderInformationProps = {
  orderNumber: string;
  dateCreated?: Date;
};

const OrderInformation: React.FC<OrderInformationProps> = ({ orderNumber, dateCreated }) => {
  return (
    <Card>
      <CardHeader>
         <h2 className="text-lg font-semibold">Informations de la commande</h2>
      </CardHeader>
      <CardBody className="flex gap-5">
       
          <div className="flex items-center space-x-3">
            <Hash className="text-indigo-600" />
            <div>
              <p className="text-muted-foreground text-sm">Numéro de commande</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="text-indigo-600" />
            <div>
              <p className="text-muted-foreground text-sm">Date de création</p>
              <p className="font-medium">
                {(dateCreated ?? new Date()).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
      
      </CardBody>
     
    </Card>
  );
};

export default OrderInformation;

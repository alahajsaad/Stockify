
import { Alert, AlertDescription } from '@/components/ui/shadcn/alert';
import { Badge } from '@/components/ui/shadcn/badge';
import { AlertTriangle, Package } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

const AlertsSection = () => {
  const lowStockProducts = [
    { name: "iPhone 15 Pro Max", current: 3, minimum: 10, category: "Smartphones" },
    { name: "MacBook Air M2", current: 1, minimum: 5, category: "Ordinateurs" },
    { name: "AirPods Pro 2", current: 7, minimum: 15, category: "Audio" }
  ];

 

  if (lowStockProducts.length === 0) {
    return null;
  }

  return (
     <div className='w-full'>
        {lowStockProducts.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <h1 className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Stock bas ({lowStockProducts.length})
              </h1>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {lowStockProducts.map((product, index) => (
                  <Alert key={index} className="border-red-300 bg-white">
                    <Package className="h-4 w-4 text-red-600" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{product.name}</span>
                          <div className="text-xs text-gray-600 mt-1">
                            <Badge variant="outline" className="text-xs">{product.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-red-600">
                            {product.current} restant(s)
                          </div>
                          <div className="text-xs text-gray-500">
                            Min: {product.minimum}
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

       </div> 
     
  );
};

export default AlertsSection;
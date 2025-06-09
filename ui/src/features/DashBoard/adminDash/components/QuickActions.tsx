import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/shadcn/button';
import { Plus, Package, Search, FileText, Users, Settings, PackagePlus, PackageMinus } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: "Ajouter un produit",
      description: "Créer un nouveau produit dans l'inventaire",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => console.log("Add product")
    },
    {
      title: "Entrée de stock",
      description: "Nouvelle commande fournisseur",
      icon: PackagePlus,
      color: "bg-green-500 hover:bg-green-600",
      action: () => console.log("Add stock entry")
    },
    {
      title: "Sortie de stock",
      description: "Nouvelle commande client",
      icon: PackageMinus,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => console.log("Search product")
    }
  ];

  return (
    <Card className='w-full'>
      <CardHeader>
        <h1>Actions rapides</h1>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              className="h-auto p-4 flex items-start gap-3 hover:shadow-md transition-shadow"
              variant={"outline"}
              onClick={action.action}
            >
              <div className={`p-2 rounded-lg ${action.color} text-white flex-shrink-0`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-xs text-gray-500 mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default QuickActions;
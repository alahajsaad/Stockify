import { Edit, Trash } from 'lucide-react';
import { Category } from '@/services/api/category/types';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/shadcn/button';

interface CategoryCardProps {
  category: Category;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CategoryCard = ({ category, onEdit, onDelete }: CategoryCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-slate-50 to-white border-slate-200">
      <CardBody className="p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-semibold text-blue-600">
                {category.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">
              ID: {category.id}
            </p>
          </div>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category.id)}
              className="flex-1 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-1" />
              Modifier
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(category.id)}
              className="flex-1 hover:bg-red-50 hover:border-red-200 hover:text-red-600 cursor-pointer"
            >
              <Trash className="w-4 h-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
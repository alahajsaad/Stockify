import { useNavigate } from 'react-router-dom';
import { SquarePen, Trash2 } from 'lucide-react';

type VariantType = 
  | "WithNavigation" 
  | "WithActions";

type TableProps<T extends { id: number }> = {
  data: T[];
  head: string[]; // Headers for the table
  route?: string; // Only required when variant is WithNavigation
  variant: VariantType;
  onEdit?: (id : number) => void; // Only required when variant is WithActions
  onDelete?: (id :number) => void; // Only required when variant is WithActions
};

const Table = <T extends { id: number }>({
  data,
  head,
  route,
  variant,
  onEdit,
  onDelete
}: TableProps<T>) => {
  const navigate = useNavigate();
  const isActionVariant = variant === "WithActions";
  const isNavigationVariant = variant === "WithNavigation";

  // Ensure required props are provided based on variant
  if (isNavigationVariant && !route) {
    console.warn("Route prop is required when using WithNavigation variant");
  }

  if (isActionVariant && (!onEdit || !onDelete)) {
    console.warn("onEdit and onDelete props are required when using WithActions variant");
  }

  const handleRowClick = (id: number) => {
    if (isNavigationVariant && route) {
      navigate(`${route}/${id}`);
    }
  };

  // Handle action clicks with stopPropagation to prevent row navigation
  const handleEditClick = (id:number ,e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(id); 
  };

  const handleDeleteClick = (id:number,e: React.MouseEvent) => {
    e.stopPropagation();
     onDelete?.(id); 
  };

  // Determine which fields to display
  const fieldsToDisplay = (data.length > 0 
    ? Object.keys(data[0]).filter(key => key !== 'id') as (keyof T)[] 
    : []);

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="text-xs uppercase bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200">
          <tr>
            {head.map(h => (
              <th className="px-6 py-4 font-semibold tracking-wider" key={h}>{h}</th>
            ))}
            {isActionVariant && <th className="px-6 py-4 font-semibold tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                className={`bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 ${isNavigationVariant ? 'cursor-pointer' : ''} transition-colors duration-200`}
                key={item.id}
                onClick={() => isNavigationVariant && handleRowClick(item.id)}
              >
                {fieldsToDisplay.map(field => (
                  <td className="px-6 py-4 whitespace-nowrap" key={String(field)}>
                    {String(item[field])}
                  </td>
                ))}
                {isActionVariant && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <SquarePen className="cursor-pointer text-blue-500 hover:text-blue-700"  onClick={(e) => handleEditClick(item.id, e)} />
                      <Trash2 className="cursor-pointer text-red-500 hover:text-red-700" onClick={(e) => handleDeleteClick(item.id, e)} />
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr className="bg-white dark:bg-gray-800">
              <td 
                colSpan={isActionVariant ? head.length + 1 : head.length}
                className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                Aucune donnée disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
import { useNavigate, useLocation } from 'react-router-dom';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type VariantType = 
  | "Default"
  | "WithNavigation" 
  | "WithActions"
  | "WithSelect";

// Allow any value type for display in table cells
type CellValue = string | number | JSX.Element;

// Generic type for table data
type TableProps<T extends { id: number; [key: string]: CellValue }> = {
  data: T[];
  head: string[]; // Headers for the table
  variant: VariantType;
  onEdit?: (object: T) => void; // Only required when variant is WithActions
  onDelete?: (id: number) => void; // Only required when variant is WithActions
  onSelect?: (id: number) => void; // Only required when variant is WithSelect
  initialSelectedId?: number; // Optional initial selected ID
};

const Table = <T extends { id: number; [key: string]: CellValue }>({
  data,
  head,
  variant,
  onEdit,
  onDelete,
  onSelect,
  initialSelectedId
}: TableProps<T>) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isDefaultVariant = variant === "Default";
  const isActionVariant = variant === "WithActions";
  const isNavigationVariant = variant === "WithNavigation";
  const isSelectVariant = variant === "WithSelect";
  
 
  // Initialize selected ID state, using initialSelectedId if provided
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId || null);

  // Update selectedId if initialSelectedId prop changes
  useEffect(() => {
    if (initialSelectedId !== undefined) {
      setSelectedId(initialSelectedId);
    }
  }, [initialSelectedId]);

  // Ensure required props are provided based on variant
 if (isActionVariant && (!onEdit && !onDelete)) {
  console.warn("At least one of onEdit or onDelete must be provided when using WithActions variant");
}


  const handleRowClick = (id: number) => {
    if (isNavigationVariant) {
      const route = location.pathname + `/${id}`;
      navigate(route);
    }
  };

  const onItemClick = (id: number) => {
    // No action for Default variant
    if (isDefaultVariant) {
      return;
    }
    
    if (isNavigationVariant) {
      handleRowClick(id);
    }
    if (isSelectVariant) {
      // Toggle selection if clicking the same row again
      const newSelectedId = id === selectedId ? null : id;
      setSelectedId(newSelectedId);
      
      // Call onSelect with the new selection state
      if (onSelect) {
        onSelect(newSelectedId !== null ? newSelectedId : -1); // Use -1 to indicate deselection
      }
      
      // Debug log to verify state update
      console.log("Selected ID updated:", newSelectedId);
    }
  };

  // Handle action clicks with stopPropagation to prevent row navigation
  const handleEditClick = (object: T, e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(object); 
  };

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id); 
  };

  // Determine which fields to display (excluding the id field)
  const fieldsToDisplay = (data.length > 0 
    ? Object.keys(data[0]).filter(key => key !== 'id')
    : []);

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {head.map((h, index) => (
              <th className="px-6 py-3 font-semibold tracking-wider uppercase border-b border-gray-200" key={index}>{h}</th>
            ))}
            {isActionVariant && ( <th className="px-6 py-4 font-semibold tracking-wider">Actions</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((item) => {
              // Determine if this row is selected
              const isSelected = isSelectVariant && selectedId === item.id;
              
              return (
                <tr
                  className={`
                    ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'} 
                    ${!isDefaultVariant ? 'hover:bg-blue-50 dark:hover:bg-gray-700' : ''}
                    ${(isNavigationVariant || isSelectVariant) && !isDefaultVariant ? 'cursor-pointer' : ''}
                    transition-colors duration-200
                  `}
                  key={item.id}
                  onClick={() => onItemClick(item.id)}
                >
                  {fieldsToDisplay.map((field, index) => (
                    <td className="px-6 py-4" key={index}>
                      {item[field]}
                    </td>
                  ))}
                  {isActionVariant && (onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {onEdit && (
                          <SquarePen
                            className="cursor-pointer text-blue-500 hover:text-blue-700"
                            onClick={(e) => handleEditClick(item, e)}
                          />
                        )}
                        {onDelete && (
                          <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={(e) => handleDeleteClick(item.id, e)}
                          />
                        )}
                      </div>
                    </td>
                  )}

                </tr>
              );
            })
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
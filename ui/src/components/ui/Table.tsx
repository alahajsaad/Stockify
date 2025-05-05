import { useNavigate } from 'react-router-dom';

type TableProps<T extends { id: number }> = {
  data: T[];
  head: string[]; // Headers for the table
  route?: string;
  displayFields?: (keyof T)[]; // Optional array to specify which fields to display and in what order
};

const Table = <T extends { id: number }>({ 
  data, 
  head, 
  route = '',
  displayFields 
}: TableProps<T>) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    // Using a function that returns a function to avoid immediate execution
    return () => navigate(`${route}/${id}`);
  };

  // Determine which fields to display
  const fieldsToDisplay = displayFields || 
    (data.length > 0 ? 
      Object.keys(data[0]).filter(key => key !== 'id') as (keyof T)[] : 
      []);

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {head.map(h => (
              <th className="px-6 py-3" key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              className='cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900'
              key={item.id}
              onClick={handleRowClick(item.id)}
            >
              {fieldsToDisplay.map(field => (
                <td className="px-6 py-4" key={String(field)}>
                  {String(item[field])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
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
    <div className="relative overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="text-xs uppercase bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200">
          <tr>
            {head.map(h => (
              <th className="px-6 py-4 font-semibold tracking-wider" key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                key={item.id}
                onClick={handleRowClick(item.id)}
              >
                {fieldsToDisplay.map(field => (
                  <td className="px-6 py-4 whitespace-nowrap" key={String(field)}>
                    {String(item[field])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="bg-white dark:bg-gray-800">
              <td 
                colSpan={head.length} 
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
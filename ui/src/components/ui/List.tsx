import { useState, useEffect } from "react";

interface ListProps<T> {
  data: T[];
  showedAttribute: (keyof T)[];
  setSelectedItem: (item: T | null) => void;
}

const List = <T,>({ data, showedAttribute, setSelectedItem }: ListProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(data.length > 0);
  }, [data]);

  const handleSelect = (item: T) => {
    
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <ul className="w-full mt-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute z-10">
          {data.map((d, index) => (
            <li
              key={index}
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
              onClick={() => handleSelect(d)}
            >
              {showedAttribute.map((att, idx) => (
                <span key={idx}>
                  {String(d[att])}
                  {idx < showedAttribute.length - 1 ? " / " : ""}
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;

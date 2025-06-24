import { useEffect, useRef } from "react";

interface ListProps<T> {
  data?: T[];
  showedAttribute: (keyof T)[];
  setSelectedItem: (item: T) => void;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}

const List = <T,>({
  data,
  showedAttribute,
  setSelectedItem,
  isOpen,
  setIsOpen,
}: ListProps<T>) => {
  // Fix: Changed HTMLElement to HTMLUListElement to match the ul element
  const ref = useRef<HTMLUListElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (ref.current && !ref.current.contains(target)) {
        setIsOpen(false);
      }
    };
    
    // Only add the event listener if the dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <ul
          ref={ref}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600"
        >
          {data?.length ? (
            data.map((d, index) => (
              <li
                key={index}
                role="option"
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-100 dark:text-white dark:hover:bg-gray-600"
                onClick={() => setSelectedItem(d)}
              >
                {showedAttribute.map((att, idx) => (
                  <span key={idx}>
                    {String(d[att])}
                    {idx < showedAttribute.length - 1 ? " / " : ""}
                  </span>
                ))}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-300">Aucun résultat</li>
          )}
        </ul>
      )}
    </>
  );
};

export default List;
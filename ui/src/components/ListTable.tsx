import { useClickOutside } from "src/hooks/useClickOutSide";

interface ListProps<T> {
  data?: T[];
  showedAttribute: (keyof T)[];
  setSelectedItem: (item: T | null) => void;
  isOpen : boolean;
  setIsOpen : (bool : boolean) => void;
}

const List = <T,>({ data, showedAttribute, setSelectedItem, isOpen, setIsOpen }: ListProps<T>) => {
  const { ref } = useClickOutside<HTMLUListElement>(() => setIsOpen(false));

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <ul
          ref={ref}
          className="w-full mt-1 text-sm font-medium text-gray-900 bg-white border border-blue-400 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute z-10"
        >
          {data?.map((d, index) => (
            <li
              key={index}
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
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

export default List
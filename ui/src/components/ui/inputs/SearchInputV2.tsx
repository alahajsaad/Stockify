import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import Input from "./Input";

type SearchInputV2Props<T, K extends keyof T = keyof T> = {
  queryKey: string;
  queryFn: () => Promise<T[]>;
  displayKey: K & string;
  handleSelect: (item: T) => void;
};

const SearchInputV2 = <T extends { id: string | number }, K extends keyof T>({
  queryKey,
  queryFn,
  displayKey,
  handleSelect,
}: SearchInputV2Props<T, K>) => {
  const [data, setData] = useState<T[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const {
    data: fetchedData,
    refetch,
  } = useQuery<T[], Error>({
    queryKey: [queryKey],
    queryFn,
    enabled: false,
  });

  useEffect(() => {
    console.log("debounced :" +debouncedSearchValue)
    if (debouncedSearchValue.trim() !== "") {
      refetch().then((result) => {
        if (result.data) {
          const filtered = result.data.filter((item) =>
            String(item[displayKey])
              .toLowerCase()
              .includes(debouncedSearchValue.toLowerCase())
          );
          setData(filtered);
          setIsOpen(true);
        }
      });
    } else {
      setData([]);
      setIsOpen(false);
    }
  }, [debouncedSearchValue, refetch, displayKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("value :" + e.target.value)
    setSearchValue(e.target.value);
  };

  const handleItemSelect = (item: T) => {
    setSearchValue(String(item[displayKey]));
    setIsOpen(false);
    handleSelect(item);
  };

  return (
    <div className="relative w-full">
      <Input onChange={handleChange}  value={searchValue} placeholder="Search..."/>
      {isOpen && data.length > 0 && (
        <ul className="w-full mt-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg absolute z-10 max-h-60 overflow-y-auto">
          {data.map((item) => (
            <li
              key={String(item.id)}
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700"
              onClick={() => handleItemSelect(item)}
            >
              {String(item[displayKey])}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInputV2;
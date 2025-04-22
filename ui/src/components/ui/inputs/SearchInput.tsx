import { useEffect, useState } from "react";
import Input from "./Input";
import { Search } from 'lucide-react';
import { useDebounce } from "src/hooks/useDebounce";
import useSearchInput from "src/hooks/useSearchInput";
import List from "../List";

// Define a generic interface for the data type
interface SearchData {
  name: string;
  [key: string]: any;
}

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  queryKey?: string;
  fetchFn?: () => Promise<SearchData[]>;
  label?: string;
  showedAttributes?: (keyof SearchData)[];
  onSelect?: (item: SearchData | null) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  queryKey = "search",
  fetchFn = async () => [], // Default empty fetch function
  label = "Search",
  showedAttributes = ["name"],
  onSelect,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  
  // Use our custom hook
  const {
    data,
    isLoading,
    isError,
    selectedData,
    setSelectedData,
    refetch
  } = useSearchInput<SearchData>({
    queryKey,
    queryFn: fetchFn
  });

  // Update parent component when an item is selected
  useEffect(() => {
    if (onSelect && selectedData) {
      onSelect(selectedData);
    }
  }, [selectedData, onSelect]);

  // Search data when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue) {
      refetch();
    }
  }, [debouncedSearchValue, refetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="relative">
      <Input 
        onChange={handleChange} 
        value={searchValue}
        label={label}
        Icon={Search}
        {...props} 
      />
      
      {isLoading && <div className="mt-1">Loading...</div>}
      {isError && <div className="mt-1 text-red-500">Error loading data</div>}
      
      {data && data.length > 0 && (
        <List
          data={data}
          setSelectedItem={setSelectedData}
          showedAttribute={showedAttributes}
        />
      )}
    </div>
  );
};

export default SearchInput;
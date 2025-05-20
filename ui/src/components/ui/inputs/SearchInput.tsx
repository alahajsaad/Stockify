import { useEffect, useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";
import { Search } from 'lucide-react';

type SearchInputProps = {
  setSearchKey: (searchKey: string) => void;
  isPending: boolean;
  label?:string
  onfocus? : () => void
  value? : string
  placeholder ? : string
  
};

const SearchInput: React.FC<SearchInputProps> = ({ setSearchKey, isPending , label , onfocus , value , placeholder , ref}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(()=>{
    if(value)
    setSearchValue(value)
  },[value])
  useEffect(() => {
    setSearchKey(debouncedSearchValue);
  }, [debouncedSearchValue, setSearchKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Input
      onChange={handleChange}
      value={searchValue}
      placeholder={placeholder? placeholder : "Rechercher ..."}
      aria-label="search-input"
      label={label}
      onFocus={onfocus}
      Icon={Search}
    
    
    >
      <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
        {isPending ? <LoaderCircle className="animate-spin" /> : null}
      </div>
    </Input>
  );
};

export default SearchInput;

// Select.tsx
type SelectProps<T extends string> = {
  options: Map<string, string>;
  setOption: (option: T) => void;
  selectedOption?: T;
  className?: string;
  default? : T
};

function Select<T extends string>({ 
  options, 
  setOption, 
  selectedOption,
  className = "" ,
  default : defaultOption
  
}: SelectProps<T>) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value as T);
  };
  
  return (
    <div className="relative">
      <select
        className={`block w-full px-4 py-2 text-base rounded-md border border-gray-300 
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          bg-white appearance-none cursor-pointer ${className}`}
        onChange={handleSelectChange}
        value={selectedOption || ''}
      >
         <option value="" disabled={!defaultOption}>{defaultOption || "Select an option"}</option>
         {Array.from(options.entries()).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}

export default Select;
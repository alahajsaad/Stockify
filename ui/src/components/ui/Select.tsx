import React from 'react';
import { ChevronDown } from 'lucide-react';

type SelectProps<T extends string> = {
  mapOptions?: Map<any, string>;
  listOptions?: string[];
  setOption: (option: T) => void;
  selectedOption?: T;
  className?: string;
  default?: T;
};

function Select<T extends string>({
  mapOptions,
  listOptions,
  setOption,
  selectedOption,
  className = "",
  default: defaultOption
}: SelectProps<T>) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value as T);
  };

  // Determine which options to use and create entries
  const getOptionsEntries = () => {
    if (mapOptions) {
      return Array.from(mapOptions.entries());
    } else if (listOptions) {
      return listOptions.map(option => [option, option] as [string, string]);
    }
    return [];
  };

  const optionsEntries = getOptionsEntries();

  return (
    <div className="relative">
      <select
        className={`block w-full px-4 py-2 text-base rounded-md border border-gray-300
           shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
           bg-white appearance-none cursor-pointer ${className}`}
        onChange={handleSelectChange}
        value={selectedOption || ''}
      >
        <option value="" disabled={!defaultOption}>
          {defaultOption || "Select an option"}
        </option>
        {optionsEntries.map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
}

export default Select;


// Ce composant Select générique accepte soit une Map avec des clés/labels personnalisés (mapOptions) 
// soit un simple tableau de chaînes (listOptions) pour afficher les options de sélection.
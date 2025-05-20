import { LucideIcon } from "lucide-react";
import { ReactNode, useId } from "react";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: LucideIcon;
  type: string;
  testId : string;
  children : ReactNode 
  
}

const Input: React.FC<Partial<InputProps>> = ({type='text' , label, Icon, testId, children , ...props}) => {
  const id = useId();
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <input
         
          type={type}
          id={id}
          data-testid={testId}
          className={`bg-gray-50 border p-2.5 border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
            Icon ? "ps-10" : "p-2.5"
          } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          {...props} 
        />
        {children}

        
      </div>
    </div>
  );
};

export default Input;

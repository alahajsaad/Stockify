import { LucideIcon } from "lucide-react";
import { useId, useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  Icon?: LucideIcon; // Corrected type for Lucide React Icons
  variant?: 'text' | 'password';
}

const Input: React.FC<InputProps> = ({variant = 'text' , label, Icon, ...props }) => {
  const id = useId();
  // const [showPassword, setShowPassword] = useState(false);
  // const togglePassword = () => setShowPassword(!showPassword);

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
          type={variant}
          id={id}
          className={`bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
            Icon ? "ps-10" : "p-2.5"
          } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          {...props} 
        />

        {/* <input
          type={showPassword ? "text" : "password"}
          placeholder="......"
          {...register('password', { required: 'Le mot de passe est requis' })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <div
          className="absolute top-9 right-3 cursor-pointer text-gray-500"
          onClick={togglePassword}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </div> */}
      </div>
    </div>
  );
};

export default Input;

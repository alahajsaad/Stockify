import React from 'react';
import { Plus } from 'lucide-react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'add' | 'link';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; 
  testId?: string;

}

const Button: React.FC<ButtonProps> = ({children,variant = 'primary',type = 'button', onClick, className, disabled = false ,testId }) => {
  // const defaultClasses = 'text-blue-600 bg-white hover:bg-blue-600 hover:text-white border border-blue-600 font-medium rounded text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-colors duration-200 ease-in-out flex items-center gap-1 cursor-pointer';
  // const disabledClasses = 'bg-gray-300 text-gray-500 border-gray-300 font-medium rounded text-sm px-5 py-2.5 '; // Prevent hover styles when disabled
  

const baseClasses = "py-2 px-4 rounded font-medium text-sm focus:outline-none cursor-pointer";

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
  add: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 p-2",
  link: "text-blue-500 hover:text-blue-700",
};

const transitionClasses = "transition-colors duration-300 ease-in-out";

const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none"; // Prevents hover/focus

const buttonClasses = [
  baseClasses,
  variantClasses[variant],
  !disabled && transitionClasses,
  disabled && disabledClasses,
  className
].filter(Boolean).join(" ");

  return (
    <button 
      data-testid={testId}
      type={type}
      onClick={!disabled ? onClick : undefined}
      className={buttonClasses}
      disabled={disabled} 
      
    >
     
     {variant === 'add' ? <Plus size={20} /> : children}
    </button>
  );
};

export default Button;

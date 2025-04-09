import { useState } from "react";
import Input  from "./Input";
import {Eye , EyeOff , LockKeyhole} from "lucide-react";
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label? : string
} 

const PasswordInput : React.FC<PasswordInputProps> = ({label = "Mot de passe" ,...props}) => {
      const [showPassword, setShowPassword] = useState(false);
      const togglePassword = () => setShowPassword(!showPassword);
    return (
       
            <Input  
                type={showPassword ? "text" : "password"}
                placeholder="*****"
                label={label}
                Icon={LockKeyhole}
                //className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
                children={
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500" onClick={togglePassword}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div> 
                } 
            />

           
       
    );
}
export default PasswordInput ;


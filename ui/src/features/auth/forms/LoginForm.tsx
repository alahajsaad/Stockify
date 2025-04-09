
import { Input , Button, PasswordInput} from "../../../components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail  } from 'lucide-react';
import AuthService from "src/services/AuthService";
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from "src/types";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/AuthProvider";

const formSchema = z.object({
    
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(1,'password required')
   
  });

type FormValues = z.infer<typeof formSchema>;



const  LoginForm : React.FC = () => {

    const navigate = useNavigate();
    const { login } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
       
        resolver: zodResolver(formSchema), // Using zodResolver for validation
      });

      const handleFormSubmit = async (data: FormValues) => {
        try {
          const token = await logIn(data); // await the actual login
          const decoded = jwtDecode<TokenPayload>(token);
          login(decoded)
          console.log(decoded.scope);
      
          // Redirect based on role
          switch (decoded.scope) {
            case 'ROLE_ADMIN':
              navigate('/dashboard');
              break;
            case 'ROLE_TECHNICIAN':
              navigate('/technician');
              break;
            case 'ROLE_SECRETARY':
              navigate('/secretary');
              break;
            default:
              navigate('/dashboard');
          }
      
          reset();
        } catch (error) {
          console.error("Login failed", error);
          // TODO: show error to user
        }
      };
      
      async function logIn(data: FormValues): Promise<string> {
        return await AuthService.auth(data);
      }
      

    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)} >
          <div>
            <Input Icon={Mail} placeholder="votre@gmail.com" label="Email" {...register('email')}/>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div>
            <PasswordInput {...register('password')}/>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <div className='flex justify-end mt-[20px]'>
              <Button type="submit">Se connecter</Button>
          </div> 
        </form>
    );
}
export default LoginForm ;

import { Input , Button, PasswordInput} from "../../../components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail  } from 'lucide-react';
import { ApiResponse, LoginRequest, LoginResponse } from "src/types";
import { useAuth } from "../components/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "src/services/api/auth";
import { Link } from "react-router-dom";
import { Paths } from "src/lib/paths";

const formSchema = z.object({
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(1,'password required')
  });

type FormValues = z.infer<typeof formSchema>;

const  LoginForm : React.FC = () => {
    const { login } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
       resolver: zodResolver(formSchema),
      });
    const handleFormSubmit = async (data: FormValues) => {
        try {
          const response = await mutation.mutateAsync({ username: data.email, password: data.password });
          if (response.data){
            login(response.data?.access_token)
          }
          reset();
        } catch (error) {
          console.error("Login failed", error);
        }
      };
      
      const mutation = useMutation<ApiResponse<LoginResponse>,Error,LoginRequest>({
        mutationFn : authenticate,
      })
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
          <div className='flex flex-col mt-[20px]'>
              <Button type="submit">Se connecter</Button>
              <div className="flex justify-end mt-2">
                
                <Link className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors" to={Paths.forgotPassword}>mot de passe oublié</Link>
              </div>
          </div> 
        </form>
    );
}
export default LoginForm ;
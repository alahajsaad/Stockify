
import { Input , Button, PasswordInput} from "../../../components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail  } from 'lucide-react';
import { LoginRequest } from "src/types";
import { useAuth } from "../components/AuthProvider";
import {  useAuthenticate } from "src/services/api/auth";
import { Link } from "react-router-dom";
import { Paths } from "src/lib/paths";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(1,'password required')
  });

type FormValues = z.infer<typeof formSchema>;

const  LoginForm : React.FC = () => {
    const [authError,setAuthError] = useState<string>()
    const { login } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
       resolver: zodResolver(formSchema),
      });
    
    const {mutate : authenticate , isPending , isError , error} = useAuthenticate()
    if(isError){
      console.log("isError message" + isError)
    }
    const handleFormSubmit = async (data: FormValues) => {

       const credential : LoginRequest = {
        username : data.email,
        password : data.password
       }
      authenticate(credential, {
      onSuccess: (response) => {
        if (!response.data) {
          console.error("Login failed: No data returned");
          return;
        }

        login(response.data.access_token);
      },
      onError: (err: Error) => {
        setAuthError(err.message); 
      }
});

      };
      
      
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
          {authError && <p className="text-red-500 text-sm">{authError}</p>}

          <div className='flex flex-col mt-[20px]'>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Connexion..." : "Se connecter"}
              </Button>
              <div className="flex justify-end mt-2">
                <Link className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors" to={Paths.forgotPassword}>mot de passe oublié</Link>
              </div>
          </div> 
        </form>
    );
}
export default LoginForm ;
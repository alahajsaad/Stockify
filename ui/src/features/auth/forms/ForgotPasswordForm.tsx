
import { Input , Button } from "../../../components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail  } from 'lucide-react';
import {  useForgetPassword } from "src/services/api/auth";
import { toast } from "react-toastify";
import { useState } from "react";


const formSchema = z.object({
    email: z.string().email('Adresse email invalide'),
  });

type FormValues = z.infer<typeof formSchema>;

const  ForgotPasswordForm : React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
       resolver: zodResolver(formSchema),
      });
    const [error,setError] = useState<string>()
    const handleFormSubmit = async (data: FormValues) => {
        forgotPassword(data.email,{
            onSuccess:(response) =>{
               toast.info(response.message)
            },
            onError:(response) =>{
               setError(response.message)
            }
        })
      };
      
      const { mutate : forgotPassword ,isPending} = useForgetPassword()
      return (
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)} >
          <div>
            <Input Icon={Mail} placeholder="votre@gmail.com" label="Email" {...register('email')}/>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className='flex justify-end mt-[20px]'>
              <Button disabled={isPending} type="submit">{isPending ? "Envoi en cours..." : "Réinitialiser le mot de passe"}</Button>
          </div> 
        </form>
    );
}
export default ForgotPasswordForm ;
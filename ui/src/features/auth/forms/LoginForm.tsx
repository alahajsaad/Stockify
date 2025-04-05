
import { Input , Button} from "../../../components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail , LockKeyhole } from 'lucide-react';
const formSchema = z.object({
    
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(1,'password required')
   
  });

type FormValues = z.infer<typeof formSchema>;

const  LoginForm : React.FC = () => {


    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
       
        resolver: zodResolver(formSchema), // Using zodResolver for validation
      });

      const handleFormSubmit = (data: FormValues) => {
        console.log(data)
        reset(); 
      };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)} >
          <div>
            <Input Icon={Mail} placeholder="votre@gmail.com" label="Email" {...register('email')}/>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div>
            <Input type="password" Icon={LockKeyhole} placeholder="......" label="Mot de passe" {...register('password')}/>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <div className='flex justify-end mt-[20px]'>
              <Button type="submit">Se connecter</Button>
          </div> 
        </form>
    );
}
export default LoginForm ;
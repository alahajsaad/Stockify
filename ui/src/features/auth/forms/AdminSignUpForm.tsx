import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input, PasswordInput } from "src/components/ui";
import { z } from "zod";
const formSchema = z
  .object({
    firstName: z.string().min(1, "Remplissez votre prénom s'il vous plaît"),
    lastName: z.string().min(1, "Remplissez votre nom s'il vous plaît"),
    email: z.string().email("L'email doit être rempli correctement"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    verifiedPassword: z.string(),
    telegramId: z.string(),
  })
  .superRefine(({ password, verifiedPassword }, ctx) => {
    if (password !== verifiedPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["verifiedPassword"],
      });
    }
  });
type FormValues = z.infer<typeof formSchema>;

type FormProps = {
    setStep : (step : number) => void
}

const AdminSignUpForm : React.FC<FormProps> = ({setStep}) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
       resolver: zodResolver(formSchema), // Using zodResolver for validation
    });
    const handleFormSubmit = (data: FormValues) => {
        console.log(data)
        setStep(2)
    }
    return (
       
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)} >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Input placeholder="ala" label="Prénom" {...register('firstName')}/>
                {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
            </div>
            <div>
                <Input placeholder="haj saad" label="Nom" {...register('lastName')}/>
                {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
            </div>
          </div>
         
          <div>
            <Input placeholder="votre@email.com" label="Email" {...register('email')}/>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div>
            <PasswordInput {...register('password')}/>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <div>
            <PasswordInput label="Confirmez le mot de passe" {...register('verifiedPassword')}/>
            {errors.verifiedPassword && <p className='text-red-500'>{errors.verifiedPassword.message}</p>}
          </div>
          <div>
            <Input placeholder="6543576634" label="Telegram Id" {...register('telegramId')}/>
            {errors.telegramId && <p className='text-red-500'>{errors.telegramId.message}</p>}
          </div>
          <div className='flex justify-end mt-[20px]'>
              <Button type="submit">suivant</Button>
          </div> 
        </form>
       
       
    );
}
export default AdminSignUpForm ;
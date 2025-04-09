import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "src/components/ui";
import { z } from "zod";
const formSchema = z
  .object({
    name: z.string().min(1, "Remplissez votre prénom s'il vous plaît"),
    taxNumber: z.string().min(1, "Remplissez votre nom s'il vous plaît"),
    email: z.string().email("L'email doit être rempli correctement"),
    phone: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    address: z.string(),
    city: z.string(),
   // logo: z.string()
  })
 ;
type FormValues = z.infer<typeof formSchema>;

type FormProps = {
    setStep : (step : number) => void
}

const CompanyCreationForm : React.FC<FormProps> = ({setStep}) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
       resolver: zodResolver(formSchema), // Using zodResolver for validation
    });
    const handleFormSubmit = (data: FormValues) => {
        console.log(data)

        setStep(4)
    }
    return (
       
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)} >
         
            <div>
                <Input placeholder="" label="Nom de l'entreprise" {...register('name')}/>
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div>
                <Input placeholder="" label="Numéro fiscale" {...register('taxNumber')}/>
                {errors.taxNumber && <p className='text-red-500'>{errors.taxNumber.message}</p>}
            </div>
          
         
          <div>
            <Input placeholder="" label="Email de l'entreprise" {...register('email')}/>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder="" label="Numero de telephone de l'entreprise" {...register('phone')}/>
            {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input placeholder="" label="Adresse" {...register('address')}/>
              {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
            </div>
            <div>
              <Input placeholder="" label="Ville" {...register('city')}/>
              {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
            </div>
          </div>
          
          <div className='flex justify-end mt-[20px]'>
              <Button type="submit">suivant</Button>
          </div> 
        </form>
       
       
    );
}
export default CompanyCreationForm ;
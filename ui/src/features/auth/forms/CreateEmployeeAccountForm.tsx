import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Input } from "src/components/ui";
import { useCreateEmployeeAccount } from "src/services/api/user";
import { EmployeeCreationDto } from "src/types/user";
import { z } from "zod";
const formSchema = z
  .object({
    firstName: z.string().min(1, "ajouter prenom de votre emplyee"),
    lastName: z.string().min(1, "ajouter nom de votre employee"),
    email: z
    .string()
    .min(1, "L'email est obligatoire")
    .email("Veuillez saisir une adresse email valide")
    .max(100, "L'email ne peut pas dépasser 100 caractères")
    .toLowerCase()
   
   
  })
 ;
type FormValues = z.infer<typeof formSchema>;

interface FormProps {
    companyId:number
    onSuccess : () => void
} 

const CreateEmployeeAccountForm : React.FC<FormProps> = ({companyId,onSuccess}) => {
     const { register, handleSubmit ,reset, formState: { errors } } = useForm<FormValues>({
       resolver: zodResolver(formSchema), 
       mode: "onBlur", // Validation lors de la perte de focus
    });
    const { mutate: createEmployeeAccount , isPending } = useCreateEmployeeAccount();

    const handleFormSubmit = async (data: FormValues) => {
        const newEmployee : EmployeeCreationDto = {
            firstName:data.firstName,
            lastName:data.lastName,
            email: data.email.trim().toLowerCase(),
        }
        createEmployeeAccount({user: newEmployee,companyId: companyId},
        {
        onSuccess: (response) => {
          onSuccess()
          toast.success(response.message || "Employé créé avec succès");
          reset();
        },
        onError: (response) => {
          toast.error(response.message);
        },
      }
        );
    }

 
    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)} >
            <div>
                <Input label="Prénom *"  {...register('firstName')}/>
                {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
            </div>
            <div>
                <Input label="Nom *"  {...register('lastName')}/>
                {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
            </div>
            <div>
                <Input label="Email *" {...register('email')}/>
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className='flex justify-end mt-[20px]'>
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Ajout en cours..." : "Ajouter"}
                </Button>
            </div> 
        </form>
    );
}
export default CreateEmployeeAccountForm ;
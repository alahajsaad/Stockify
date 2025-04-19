import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button, Input } from "src/components/ui";
import InputFile from "src/components/ui/inputs/InputFile";
import { createCompany } from "src/services/api/company";
import { ApiResponse } from "src/types";
import { CompanyCreationDto, CompanyResponseDto } from "src/types/company";
import { z } from "zod";
const formSchema = z
  .object({
    name: z.string().min(1, "Remplissez votre prénom s'il vous plaît"),
    taxNumber: z.string().min(1, "Remplissez votre nom s'il vous plaît"),
    email: z.string().email("L'email doit être rempli correctement"),
    phone: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    address: z.string(),
    city: z.string(),
    zipCode : z.string(),
    logo: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, "Veuillez importer un fichier valide.")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Le fichier doit être une image JPG ou PNG."
    ),
  })
 ;
type FormValues = z.infer<typeof formSchema>;

type FormProps = {
    setStep : (step : number) => void
    setCompany : (company : CompanyResponseDto) => void
    admin_Id?: number
}

const CompanyCreationForm : React.FC<FormProps> = ({setStep , setCompany , admin_Id}) => {

    const { register, handleSubmit,  control , formState: { errors } } = useForm<FormValues>({
       resolver: zodResolver(formSchema), // Using zodResolver for validation
    });
    const handleFormSubmit = (data: FormValues) => {
      if(admin_Id){
        const adminId = admin_Id;
        mutation.mutate({ company: data, adminId });
      }
      
    };

    const queryClient = useQueryClient();
    const mutation = useMutation<ApiResponse<CompanyResponseDto>, Error, { company: CompanyCreationDto; adminId: number }>({
      mutationFn: ({ company, adminId }) => createCompany(company, adminId),
      onSuccess: (response) => {
        if (response.data) {
          queryClient.invalidateQueries({ queryKey: ["company"] });
          setCompany(response.data);
          setStep(4);
        } else {
          // Optional: Handle the case where response.data is null
          console.error("Company creation response missing data");
        }
      }
      
    });
    

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
            <div>
              <Input placeholder="" label="Code postal" {...register('zipCode')}/>
              {errors.zipCode && <p className='text-red-500'>{errors.zipCode.message}</p>}
            </div>
          </div>
          <div>
        {/* Use Controller to pass 'control' prop to InputFile */}
        <InputFile name="logo" label="Logo d'entreprise" control={control} testId="upload-input"/>
        {errors.logo && <p className="text-red-500">error with log upload</p>}
      </div>
          

          <div className='flex justify-end mt-[20px]'>
              <Button type="submit">suivant</Button>
          </div> 
        </form>
       
       
    );
}
export default CompanyCreationForm ;
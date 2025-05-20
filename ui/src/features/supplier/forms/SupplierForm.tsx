import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Input } from 'src/components/ui';
import { toast } from 'react-toastify';
import { Supplier } from 'src/types/supplier';
import { useAddSupplier, useUpdateSupplier } from 'src/services/api/supplier';




const formSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  email: z
    .union([
      z.string().email({ message: "Adresse email invalide" }),
      z.literal('')
    ]),
  address: z.string().min(1, { message: "L'adresse est requise" }),
  phoneNumber1: z
    .string()
    .regex(/^\d{8}$/, { message: "Le numéro de téléphone doit comporter exactement 8 chiffres" }),
  phoneNumber2: z
    .union([
      z.string().regex(/^\d{8}$/, {
        message: "Le numéro de téléphone doit comporter exactement 8 chiffres",
      }),
      z.literal('')
    ])
    .optional()
});


type FormValues = z.infer<typeof formSchema>;

type SupplierFormProps = {
  supplier?: Supplier;
  toggleForm?: (isEditing: boolean) => void;
  onUpdateSuccess?: (success: boolean) => void;
};

const SupplierForm = ({ supplier, toggleForm, onUpdateSuccess }: SupplierFormProps) => {
  const { mutate: addSupplier, isPending: isAddLoading } = useAddSupplier();
  const { mutate: updateSupplier, isPending: isUpdateLoading } = useUpdateSupplier();
  const isPending = isAddLoading || isUpdateLoading;
  
  // Determine if we're in edit mode
  const isEditMode = !!supplier;
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: supplier
      ? {
          firstName: supplier.firstName,
          lastName: supplier.lastName,
          email: supplier.email || '',
          address: supplier.address,
          phoneNumber1: supplier.phoneNumbers[0]?.number || '',
          phoneNumber2: supplier.phoneNumbers[1]?.number || '',
        }
      : {
          firstName: '',
          lastName: '', 
          email: '',
          address:'',
          phoneNumber1: '',
          phoneNumber2: '',
        },
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormValues) => {
    // Prepare phone numbers array from form data
    const phoneNumbers = [
      { number: data.phoneNumber1 },
      ...(data.phoneNumber2 ? [{ number: data.phoneNumber2 }] : [])
    ];
    
    if (isEditMode && supplier) {
      // Edit mode: update existing client
      const updatedSupplier: Supplier = {
        ...supplier,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email , 
        address: data.address , 
        phoneNumbers
      };
      
      updateSupplier(updatedSupplier, {
        onSuccess: (response) => {
          reset();
          toggleForm?.(false);
          onUpdateSuccess?.(true);
          toast.success(response.message);
        }
      });
    } else {
      // Add mode: create new client
      const newSupplier: Supplier = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email ,
         address: data.address ,
        phoneNumbers
      };
      
      addSupplier(newSupplier, {
        onSuccess: (response) => {
          reset();
          toggleForm?.(false);
          toast.success(response.message);
        }
      });
    }
  };
   
  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <Input placeholder="Prénom **" {...register('firstName')} />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>
        <div>
          <Input placeholder="Nom **" {...register('lastName')} />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        </div>
        <div>
          <Input placeholder="Email" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
         <div>
          <Input placeholder="Adresse" {...register('address')} />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Input placeholder="TEL 1 **" {...register('phoneNumber1')} />
                {errors.phoneNumber1 && <p className="error">{errors.phoneNumber1.message}</p>}
            </div>
            <div>
                <Input placeholder="TEL 2" {...register('phoneNumber2')} />
                {errors.phoneNumber2 && <p className="error">{errors.phoneNumber2.message}</p>}
            </div>
        </div>
       
    
      <div className="flex justify-end mt-4">
        <Button disabled={isPending} testId="AddClientButton" type="submit">
          {supplier ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

export default SupplierForm;
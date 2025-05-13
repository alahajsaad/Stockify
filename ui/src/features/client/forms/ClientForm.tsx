import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Client } from '../types';
import { Button, Input } from 'src/components/ui';
import { toast } from 'react-toastify';
import { useAddClient, useUpdateClient } from 'src/services/api/client';




const formSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string()
    .email('Adresse email invalide')
    .optional()
    .or(z.literal('')),
  // Changed to use field names matching the registration
  phoneNumber1: z.string()
    .regex(/^\d+$/, 'Le numéro de téléphone doit contenir uniquement des chiffres')
    .length(8, 'Le numéro de téléphone doit comporter exactement 8 chiffres'),
  phoneNumber2: z.string()
    .regex(/^\d+$/, 'Le numéro de téléphone doit contenir uniquement des chiffres')
    .length(8, 'Le numéro de téléphone doit comporter exactement 8 chiffres')
    .optional()
    .or(z.literal(''))
});

type FormValues = z.infer<typeof formSchema>;

type ClientFormProps = {
  client?: Client;
  toggleForm?: (isEditing: boolean) => void;
  onUpdateSuccess?: (success: boolean) => void;
};

const ClientForm = ({ client, toggleForm, onUpdateSuccess }: ClientFormProps) => {
  const { mutate: addClient, isPending: isAddLoading } = useAddClient();
  const { mutate: updateClient, isPending: isUpdateLoading } = useUpdateClient();
  const isPending = isAddLoading || isUpdateLoading;
  
  // Determine if we're in edit mode
  const isEditMode = !!client;
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: client
      ? {
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email || '',
          phoneNumber1: client.phoneNumbers[0]?.number || '',
          phoneNumber2: client.phoneNumbers[1]?.number || '',
        }
      : {
          firstName: '',
          lastName: '', 
          email: '',
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
    
    if (isEditMode && client) {
      // Edit mode: update existing client
      const updatedClient: Client = {
        ...client,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || undefined, // Use undefined instead of empty string
        phoneNumbers
      };
      
      updateClient(updatedClient, {
        onSuccess: (response) => {
          reset();
          toggleForm?.(false);
          onUpdateSuccess?.(true);
          toast.success(response.message);
        }
      });
    } else {
      // Add mode: create new client
      const newClient: Client = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || undefined,
        phoneNumbers
      };
      
      addClient(newClient, {
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
          <Input placeholder="TEL 1 **" {...register('phoneNumber1')} />
          {errors.phoneNumber1 && <p className="error">{errors.phoneNumber1.message}</p>}
        </div>
        <div>
          <Input placeholder="TEL 2" {...register('phoneNumber2')} />
          {errors.phoneNumber2 && <p className="error">{errors.phoneNumber2.message}</p>}
        </div>
    
      <div className="flex justify-end mt-4">
        <Button disabled={isPending} testId="AddClientButton" type="submit">
          {client ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
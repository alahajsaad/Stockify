import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import { Building2 } from 'lucide-react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCompany, useGetCompanyLogo, useUpdateCompany } from "src/services/api/company";
import { useForm } from "react-hook-form";
import { Button, Input } from "src/components/ui";
import InputFile from "src/components/ui/inputs/InputFile";
import { toast } from "react-toastify";
import { Company, CompanyCreationDto } from "src/types";
import { useEffect } from "react";

// Schema de validation avec logo optionnel pour la modification
const createFormSchema = (isEditMode: boolean) => 
  z.object({
    name: z.string().min(1, "Ajouter le nom de votre entreprise"),
    taxNumber: z.string().min(1, "Ajouter le numéro fiscal de votre entreprise"),
    email: z.string().email("L'email doit être rempli correctement"),
    phone: z.string().min(6, "Le numéro de téléphone doit contenir au moins 6 caractères"),
    address: z.string().min(1, "L'adresse est requise"),
    city: z.string().min(1, "La ville est requise"),
    zipCode: z.string().min(1, "Le code postal est requis"),
    logo: isEditMode 
      ? z.any().optional() // Logo optionnel en mode édition
      : z.any()
          .refine((file) => file instanceof File && file.size > 0, "Veuillez importer un fichier valide.")
          .refine(
            (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
            "Le fichier doit être une image JPG ou PNG."
          ),
  });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

type CompanyFormProps = {
  adminId: number;
  initialCompany?: Company;
  toggleForm?: (isEditing: boolean) => void;
  setCompany: (company: Company) => void;
};

const CompanyForm: React.FC<CompanyFormProps> = ({ 
  adminId, 
  initialCompany, 
  toggleForm, 
  setCompany 
}) => {
  const { mutate: createCompany, isPending: isAddLoading } = useCreateCompany();
  const { mutate: updateCompany, isPending: isUpdateLoading } = useUpdateCompany();
  const { data: logo, isPending: isLogoLoading, refetch } = useGetCompanyLogo(initialCompany?.id || 0);
  
  const isEditMode = !!initialCompany;
  const isLoading = isEditMode ? isUpdateLoading : isAddLoading;

  // Schema dynamique basé sur le mode
  const formSchema = createFormSchema(isEditMode);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode && initialCompany ? {
      name: initialCompany.name,
      taxNumber: initialCompany.taxNumber,
      email: initialCompany.email,
      phone: initialCompany.phone,
      city: initialCompany.city,
      address: initialCompany.address,
      zipCode: initialCompany.zipCode,
    } : undefined,
  });

  // Récupérer le logo si en mode édition
  useEffect(() => {
    if (isEditMode && initialCompany?.id) {
      refetch();
    }
  }, [isEditMode, initialCompany?.id, refetch]);

  // Réinitialiser le formulaire quand initialCompany change
  useEffect(() => {
    if (isEditMode && initialCompany) {
      reset({
        name: initialCompany.name,
        taxNumber: initialCompany.taxNumber,
        email: initialCompany.email,
        phone: initialCompany.phone,
        city: initialCompany.city,
        address: initialCompany.address,
        zipCode: initialCompany.zipCode,
      });
    }
  }, [isEditMode, initialCompany, reset]);

  const handleFormSubmit = (data: FormValues) => {
    if (isEditMode && initialCompany) {
      // Mode modification
      const updatedCompany: CompanyCreationDto = {
        id: initialCompany.id,
        name: data.name,
        taxNumber: data.taxNumber,
        email: data.email,
        phone: data.phone,
        city: data.city,
        address: data.address,
        zipCode: data.zipCode,
        logo: data.logo || null, // Utiliser le nouveau logo ou garder null
      };

      updateCompany(
        { company: updatedCompany },
        {
          onSuccess: (response) => {
            if (response.status === 'success' && response.data) {
              setCompany(response.data);
              toggleForm?.(false);
              toast.success(response.message || "Entreprise modifiée avec succès");
            }
          },
          onError: (error) => {
            toast.error(`Erreur lors de la modification: ${error.message}`);
          }
        }
      );
    } else {
      // Mode création
      const newCompany: CompanyCreationDto = {
        name: data.name,
        taxNumber: data.taxNumber,
        email: data.email,
        phone: data.phone,
        city: data.city,
        address: data.address,
        zipCode: data.zipCode,
        logo: data.logo,
      };

      createCompany(
        { company: newCompany, adminId: adminId },
        {
          onSuccess: (response) => {
            if (response.status === 'success' && response.data) {
              setCompany(response.data);
              toast.success(response.message || "Entreprise créée avec succès");
              reset(); // Réinitialiser le formulaire après création
            }
          },
          onError: (error) => {
            toast.error(`Erreur lors de la création: ${error.message}`);
          }
        }
      );
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center pb-8">
        <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <p className="text-2xl">
          {isEditMode ? "Modifier votre entreprise" : "Créer votre entreprise"}
        </p>
      </CardHeader>

      <CardBody>
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <Input 
              placeholder="" 
              label="Nom de l'entreprise" 
              {...register('name')}
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
          </div>

          <div>
            <Input 
              placeholder="" 
              label="Numéro fiscal" 
              {...register('taxNumber')}
            />
            {errors.taxNumber && <p className='text-red-500 text-sm mt-1'>{errors.taxNumber.message}</p>}
          </div>

          <div>
            <Input 
              placeholder="" 
              label="Email de l'entreprise" 
              type="email"
              {...register('email')}
            />
            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
          </div>

          <div>
            <Input 
              placeholder="" 
              label="Numéro de téléphone de l'entreprise" 
              {...register('phone')}
            />
            {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input 
                placeholder="" 
                label="Ville" 
                {...register('city')}
              />
              {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city.message}</p>}
            </div>
            
            <div>
              <Input 
                placeholder="" 
                label="Adresse" 
                {...register('address')}
              />
              {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address.message}</p>}
            </div>
            
            <div>
              <Input 
                placeholder="" 
                label="Code postal" 
                {...register('zipCode')}
              />
              {errors.zipCode && <p className='text-red-500 text-sm mt-1'>{errors.zipCode.message}</p>}
            </div>
          </div>

          <div>
            <InputFile 
              name="logo" 
              label={`Logo d'entreprise ${isEditMode ? '(optionnel)' : ''}`}
              control={control} 
              testId="upload-input"
            />
            {errors.logo && <p className="text-red-500 text-sm mt-1">
              {typeof errors.logo.message === 'string' ? errors.logo.message : "Erreur avec l'upload du logo"}
            </p>}
          </div>

          <div className='flex justify-end mt-[20px]'>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "En cours..." : isEditMode ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default CompanyForm;
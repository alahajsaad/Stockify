import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "src/components/ui";
import { z } from "zod";
import { valueAddedTax } from "src/types";
import { useAddValueAddedTax , useUpdateValueAddedTax } from "@/services/api/value_added_tax/hooks";
import { toast } from "react-toastify";

const formSchema = z.object({
  rate: z.coerce.number().min(1, "Veuillez ajouter un taux valide"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type VatFormProps = {
  initialVat?: valueAddedTax;
  onUpdateSuccess? : (bool : boolean) => void
  toggleForm?: (isEditing: boolean) => void;
  onAddSuccess? : ()=>void ;
};

const VatForm: React.FC<VatFormProps> = ({ toggleForm, initialVat ,onUpdateSuccess,onAddSuccess }) => {
  // Utiliser les hooks conditionnellement selon le mode (ajout ou modification)
  const { mutate: addValueAddedTax, isPending: isAddLoading } = useAddValueAddedTax();
  const { mutate: updateValueAddedTax, isPending: isUpdateLoading } = useUpdateValueAddedTax();
  
  // Déterminer si on est en mode édition
  const isEditMode = !!initialVat;
  
  // Déterminer l'état de chargement en fonction du mode
  const isLoading = isEditMode ? isUpdateLoading : isAddLoading;
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialVat 
      ? { 
          rate: initialVat.rate, 
          description: initialVat.description || "" 
        } 
      : undefined,
    resolver: zodResolver(formSchema),
  });
  
  const handleFormSubmit = (data: FormValues) => {
    if (isEditMode && initialVat) {
      // Mode édition: mettre à jour la TVA existante
      const updatedAddedValueTax: valueAddedTax = {
        ...initialVat,
        rate: data.rate,
        description: data.description || ""
      };
      
      updateValueAddedTax(updatedAddedValueTax, {
        onSuccess: (response) => {
          reset();
          toast.success(response.message)
          toggleForm?.(false);
          onUpdateSuccess?.(true);

        }
      });
    } else {
      // Mode ajout: créer une nouvelle TVA
      const newValueAddedTax: valueAddedTax = {
        rate: data.rate,
        description: data.description || ""
      };
      
      addValueAddedTax(newValueAddedTax, {
        onSuccess: (response) => {
          reset();
          toast.success(response.message)
          toggleForm?.(false);
          onAddSuccess?.()
        }
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Input 
          type="number" 
          min={0}
          label="Taux en pourcentage *" 
          {...register("rate")} 
        />
        {errors.rate && <p className="text-red-500">{errors.rate.message}</p>}
      </div>
      <div>
        <Input 
          label="Description du taux (optionnel)" 
          {...register("description")} 
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : isEditMode ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
};

export default VatForm;
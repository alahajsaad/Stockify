import { Button, Input } from "@/components/ui";
import { useCreateSubscriptionPlan, useUpdateSubscriptionPlan } from "@/services/api/subscription_plan/hooks";
import { SubscriptionPlan } from "@/services/api/subscription_plan/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Veuillez ajouter un nom du plan d'abonnement"),
  price: z.coerce.number().min(0, "Veuillez ajouter le prix correspondant à ce plan"),
  maxUsers: z.coerce.number().min(1, "Veuillez spécifier le nombre maximum d'utilisateurs avec ce plan"),
  maxStorageMb: z.coerce.number().min(1, "Veuillez spécifier le stockage maximum en mégaoctets"),
  features: z.string().min(1, "Veuillez ajouter les fonctionnalités de ce plan")
});

type FormValues = z.infer<typeof formSchema>;

type SubPlanFormProps = {
  initialPlan?: SubscriptionPlan;
  onUpdateSuccess?: (bool: boolean) => void;
  toggleForm?: (isEditing: boolean) => void;
  onAddSuccess?: () => void;
};

const SubscriptionPlanForm: React.FC<SubPlanFormProps> = ({
  initialPlan,
  onUpdateSuccess,
  toggleForm,
  onAddSuccess
}) => {
  const { mutate: addSubscriptionPlan, isPending: isAddLoading } = useCreateSubscriptionPlan();
  const { mutate: updateSubscriptionPlan, isPending: isUpdateLoading } = useUpdateSubscriptionPlan();
    
  // Déterminer si on est en mode édition
  const isEditMode = !!initialPlan;

  // Déterminer l'état de chargement en fonction du mode
  const isLoading = isEditMode ? isUpdateLoading : isAddLoading;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: initialPlan 
      ? { 
          name: initialPlan.name,
          price: initialPlan.price,
          maxUsers: initialPlan.maxUsers,
          maxStorageMb: initialPlan.maxStorageMb,
          features: initialPlan.features
        } 
      : undefined,
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormValues) => {
    if (isEditMode && initialPlan) {
      // Mode édition: mettre à jour le plan d'abonnement existant
      const updatedSubPlan: SubscriptionPlan = {
        ...initialPlan,
        name: data.name,
        price: data.price,
        maxUsers: data.maxUsers,
        maxStorageMb: data.maxStorageMb,
        features: data.features
      };
      
      updateSubscriptionPlan(updatedSubPlan, {
        onSuccess: () => {
          reset();
          toggleForm?.(false);
          onUpdateSuccess?.(true);
        }
      });
    } else {
      // Mode ajout: créer un nouveau plan d'abonnement
      const newSubPlan: SubscriptionPlan = {
        name: data.name,
        price: data.price,
        maxUsers: data.maxUsers,
        maxStorageMb: data.maxStorageMb,
        features: data.features
      };
      
      addSubscriptionPlan(newSubPlan, {
        onSuccess: () => {
          reset();
          toggleForm?.(false);
          onAddSuccess?.();
        }
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Input 
          type="text"
          label="Nom du plan d'abonnement *" 
          {...register("name")} 
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Input 
          type="number" 
          min={0}
          step="0.01"
          label="Prix *" 
          {...register("price")} 
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <Input 
          type="number" 
          min={1}
          label="Nombre maximum d'utilisateurs *" 
          {...register("maxUsers")} 
        />
        {errors.maxUsers && <p className="text-red-500">{errors.maxUsers.message}</p>}
      </div>

      <div>
        <Input 
          type="number" 
          min={1}
          label="Stockage maximum (MB) *" 
          {...register("maxStorageMb")} 
        />
        {errors.maxStorageMb && <p className="text-red-500">{errors.maxStorageMb.message}</p>}
      </div>

      <div>
        <Input 
          type="text"
          label="Fonctionnalités *" 
          {...register("features")} 
        />
        {errors.features && <p className="text-red-500">{errors.features.message}</p>}
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : isEditMode ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
};

export default SubscriptionPlanForm;
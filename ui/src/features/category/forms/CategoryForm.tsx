import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "src/components/ui";
import { z } from "zod";
import { Category } from "src/types";
import { useAddCategory, useUpdateCategory } from "src/services/api/category";

const formSchema = z.object({
  name: z.string().min(1, "Veuillez ajouter un nom de catégorie"),
});

type FormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
  initialCategory?: Category;
  toggleForm?: (isEditing: boolean) => void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({ toggleForm, initialCategory }) => {
  // Utiliser les hooks conditionnellement selon le mode (ajout ou modification)
  const { mutate: addCategory, isPending: isAddLoading } = useAddCategory();
  const { mutate: updateCategory, isPending: isUpdateLoading } = useUpdateCategory();
  
  // Déterminer si on est en mode édition
  const isEditMode = !!initialCategory;
  
  // Déterminer l'état de chargement en fonction du mode
  const isLoading = isEditMode ? isUpdateLoading : isAddLoading;
  //const error = isEditMode ? updateError : addError;
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormValues>({
    defaultValues: initialCategory ? { name: initialCategory.name } : undefined,
    resolver: zodResolver(formSchema),
  });
  
  const handleFormSubmit = (data: FormValues) => {
    if (isEditMode && initialCategory) {
      // Mode édition: mettre à jour la catégorie existante
      const updatedCategory: Category = {
        ...initialCategory,
        name: data.name
      };
      
      updateCategory(updatedCategory, {
        onSuccess: () => {
          reset();
          toggleForm?.(false);
        }
      });
    } else {
      // Mode ajout: créer une nouvelle catégorie
      const newCategory: Category = {
        name: data.name,
        // Ajoutez d'autres propriétés requises si nécessaire
      };
      
      addCategory(newCategory, {
        onSuccess: () => {
          reset();
          toggleForm?.(false);
        }
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Input label="Nom de catégorie *" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : isEditMode ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
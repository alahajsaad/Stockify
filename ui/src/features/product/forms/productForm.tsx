import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "src/components/ui";
import { Product } from "src/services/api/product";
import { z } from "zod";
import ControlledSearchCategory from "./ControlledSearchCategory";
import ControlledSelectVat from "./ControlledSelectVat";


export const formSchema = z.object({
  designation: z.string().min(1, "Designation is required"),
  reference: z.string().min(1, "Reference is required"),
  category: z.number().min(1, "Category is required"),
  criticalThreshold: z.coerce.number().min(1, "Définir un seuil de stock pour les alertes de fin de stock"),
  valueAddedTax: z.coerce.number().min(0, "Sélectionner un taux de TVA")
});

export type ProductFormSchemaType = z.infer<typeof formSchema>;
  

const ProductForm: React.FC = () => {
  const { register, handleSubmit, control,formState: { errors, isSubmitting } } = useForm<ProductFormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  
  const handleFormSubmit = async (data: ProductFormSchemaType) => {
  
    const product: Product = {
      designation: data.designation,
      reference: data.reference,
      category: {id:data.category} , 
      vat:{id:data.valueAddedTax} ,
      criticalThreshold: data.criticalThreshold,
    };
    
    try {
      console.log("Product to save:", product);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
   <div className="bg-white rounded shadow-sm p-4 lg:w-[70%]">
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Input label="Nom d'article *" {...register("designation")} />
        {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
      </div>

      <div>
        <Input label="Référence *" {...register("reference")} />
        {errors.reference && <p className="text-red-500">{errors.reference.message}</p>}
      </div>

      
     
        <div>
          <ControlledSearchCategory label={"Category *"}  name={"category"} control={control}/>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>
       
    

     
     
        <div>
          <ControlledSelectVat name={"valueAddedTax"} control={control}/>
          {errors.valueAddedTax && <p className="text-red-500">{errors.valueAddedTax.message}</p>}
        </div>
       
      

      

      <div>
        <Input type="number" label="Seuil critique de stock *" placeholder="5" {...register("criticalThreshold")} />
        {errors.criticalThreshold && <p className="text-red-500">{errors.criticalThreshold.message}</p>}
      </div>
      
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Ajouter"}
        </Button>
      </div>
    </form>
    </div>
  );
};

export default ProductForm;
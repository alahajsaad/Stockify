import { Button, Input } from "src/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductCreationDto } from "@/services/api/product/types";
import { useAddProduct } from "@/services/api/product/hooks";
import { toast } from "react-toastify";
import SelectCategory from "@/features/category/components/SelectCategory";
import SelectVat from "@/features/value_added_tax/components/SelectVat";
import { Card, CardBody } from "@/components/ui/Card";

export const formSchema = z.object({
    designation: z.string().min(1, "Designation is required"),
  reference: z.string().min(1, "Reference is required"),
  categoryId: z.number().min(1, "Sélectionner une category"),
  vatId: z.number().min(1, "Sélectionner une valeau de tax"),
   criticalThreshold: z.coerce.number().min(1, "Définir un seuil de stock pour les alertes de fin de stock"),

});


export type ProductSchemaType = z.infer<typeof formSchema>;


const AddProduct: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    setValue,
    reset, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(formSchema)
  });

  const selectedCategoryId = watch("categoryId");
  const selectedVatId = watch("vatId");
  const {mutate : addProduct , isPending} = useAddProduct()
  const handleCategorySelect = (categoryId: number) => {
    setValue("categoryId", categoryId, { 
      shouldValidate: true,
      shouldDirty: true
    });
  };
   const handleVatSelect = (vatId: number) => {
    setValue("vatId", vatId, { 
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleFormSubmit = (data: ProductSchemaType) => {
    const product : ProductCreationDto = {
        designation:data.designation,
        reference:data.reference,
        criticalThreshold:data.criticalThreshold,
        category:{id:data.categoryId},
        vat:{id:data.vatId}
    }
    addProduct(product,{
        onSuccess : (response) => {
            toast.success(response.message)
            reset()
        },
        onError : (err : Error) => {
            toast.error(err.message)
        }
    })
   
   
  };

  return (
    <Card>
      <CardBody>
      <form className="space-y-6 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Champ caché pour stocker l'ID du produit */}
        
        
        <div>
        <Input label="Nom d'article *" {...register("designation")} />
        {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
        </div>

      <div>
        <Input label="Référence *" {...register("reference")} />
        {errors.reference && <p className="text-red-500">{errors.reference.message}</p>}
      </div>
        
        <div>
        <SelectCategory
          onCategorySelect={handleCategorySelect}
          selectedCategoryId={selectedCategoryId > 0 ? selectedCategoryId : undefined}
        />
        <input type="hidden" {...register("categoryId", { valueAsNumber: true })} />
        {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}

        </div>
        
        
        <div>
         <SelectVat 
          onVatSelect={handleVatSelect}
          selectedVatId={selectedVatId > 0 ? selectedVatId : undefined}
        />
        <input type="hidden" {...register("vatId", { valueAsNumber: true })} />
        {errors.vatId && <p className="text-red-500">{errors.vatId.message}</p>}

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
      </CardBody>
    </Card>
  );
};

export default AddProduct;
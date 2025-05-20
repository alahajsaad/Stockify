import { Button, Input } from "src/components/ui";
import SelectProduct from "./SelectProduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { OrderLine } from "src/types/supplierOrder";

export const formSchema = z.object({
  productId: z.number().min(1, "Sélectionner un produit"),
  quantity: z.number().min(1, "La quantité minimale est 1"),
  price: z.number().min(1, "Ajouter un prix unitaire"),
});

export type OrderLineSchemaType = z.infer<typeof formSchema>;

type AddOrderLineType = {
    onSuccess : (orderLine: OrderLine) => void
}
const AddOrderLine: React.FC<AddOrderLineType> = ({onSuccess}) => {
  const { 
    register, 
    handleSubmit, 
    setValue,
    reset, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm<OrderLineSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: 0,
      quantity: 1,
      price: 0
    }
  });

  const selectedProductId = watch("productId");

  const handleProductSelect = (productId: number) => {
    setValue("productId", productId, { 
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleFormSubmit = (data: OrderLineSchemaType) => {
    const orderline : OrderLine = {
        quantity : data.quantity ,
        unitPrice: data.price ,
        product : {id : data.productId}
    }
    onSuccess(orderline)
    reset()
  };

  return (
    <div>
      <form className="space-y-6 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Champ caché pour stocker l'ID du produit */}
        <input type="hidden" {...register("productId", { valueAsNumber: true })} />
        
        {/* Message d'erreur pour la sélection du produit */}
        {errors.productId && (
          <div className="text-red-500 mb-2">{errors.productId.message}</div>
        )}
        
        {/* Composant de sélection du produit */}
        <SelectProduct 
          onProductSelect={handleProductSelect}
          selectedProductId={selectedProductId > 0 ? selectedProductId : undefined}
        />
        
        <div>
          <Input 
            type="number" 
            label="Quantité" 
            {...register("quantity", { valueAsNumber: true })} 
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
        </div>
        
        <div>
          <Input 
            type="number" 
            label="Prix unitaire" 
            {...register("price", { valueAsNumber: true })} 
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
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

export default AddOrderLine;
import { Button, Input } from "src/components/ui";
import SelectProduct from "./SelectProduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { OrderLine } from "src/types/supplierOrder";
import { Product } from "@/services/api/product/types";
import { useState } from "react";

export const formSchema = z.object({
  productId: z.number().min(1, "Sélectionner un produit"),
  quantity: z.number().min(1, "La quantité minimale est 1"),
  price: z.number().min(0.01, "Ajouter un prix unitaire valide"),
});

export type OrderLineSchemaType = z.infer<typeof formSchema>;

type AddOrderLineType = {
  onAddingNewOrderLine: (orderLine: OrderLine) => void;
};

const AddOrderLine: React.FC<AddOrderLineType> = ({ onAddingNewOrderLine }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<OrderLineSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: 0,
      quantity: 1,
      price: 0
    }
  });

  const [product, setProduct] = useState<Product | undefined>();

  const handleProductSelect = (selectedProduct: Product) => {
    setProduct(selectedProduct);
    setValue("productId", selectedProduct.id, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleFormSubmit = (data: OrderLineSchemaType) => {
    // Vérification de sécurité pour s'assurer que le produit est défini
    if (!product) {
      console.error("Aucun produit sélectionné");
      return;
    }

    const orderline: OrderLine = {
      quantity: data.quantity,
      unitPrice: data.price,
      product: product
    };
    
    onAddingNewOrderLine(orderline);
    reset();
    setProduct(undefined);
  };

  return (
    <div>
      <form className="space-y-6 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
        <input 
          type="hidden" 
          {...register("productId", { valueAsNumber: true })} 
        />
        
        <div>
          <SelectProduct onProductSelect={handleProductSelect} />
          {errors.productId && (
            <div className="text-red-500 mt-2 text-sm">{errors.productId.message}</div>
          )}
        </div>

        <div>
          <Input
            type="number"
            label="Quantité"
            min="1"
            step="1"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-red-500 mt-2 text-sm">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            label="Prix unitaire"
            min="0.01"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 mt-2 text-sm">{errors.price.message}</p>
          )}
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
// EditOrderLine.tsx
import { Button, Input } from "@/components/ui";
import { Card } from "@/components/ui/Card";
import { TransformedOrderLineData } from "./OrderLines";
import { useState } from "react";
import { Currency } from "@/lib/currency";

type EditOrderLineProps = {
    orderLine: TransformedOrderLineData
    onSuccess: (updatedOrderLine: TransformedOrderLineData) => void
    onCancel: () => void
}

const EditOrderLine = ({ orderLine, onSuccess, onCancel }: EditOrderLineProps) => {
    const [updatedOrderLine, setUpdatedOrderLine] = useState<TransformedOrderLineData>(orderLine)
    const [errors, setErrors] = useState<{quantity?: string, unitPrice?: string}>({})
    
    const validateInputs = () => {
        const newErrors: {quantity?: string, unitPrice?: string} = {};
        
        if (updatedOrderLine.quantity <= 0) {
            newErrors.quantity = "La quantité doit être supérieure à 0";
        }
        
        if (updatedOrderLine.unitPrice <= 0) {
            newErrors.unitPrice = "Le prix unitaire doit être supérieur à 0";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        setUpdatedOrderLine((prev) => ({
            ...prev,
            quantity: value,
            total: value * prev.unitPrice,
            totalTTC: (value * prev.unitPrice) * (1 + prev.vat)
        }))
        
        // Clear quantity error if it exists
        if (errors.quantity) {
            setErrors(prev => ({ ...prev, quantity: undefined }));
        }
    }
    
    const onUnitPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        setUpdatedOrderLine((prev) => ({
            ...prev,
            unitPrice: value,
            total: prev.quantity * value,
            totalTTC: (prev.quantity * value) * (1 + prev.vat)
        }))
        
        // Clear unit price error if it exists
        if (errors.unitPrice) {
            setErrors(prev => ({ ...prev, unitPrice: undefined }));
        }
    }

    const handleSubmit = () => {
        if (validateInputs()) {
            onSuccess(updatedOrderLine);
        }
    }
    
    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Modifier la ligne de commande</h3>
                    <p className="text-gray-600">Produit: {orderLine.productName}</p>
                    <p className="text-gray-600">Référence: {orderLine.reference}</p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <Input 
                            label="Quantité"
                            type="number"
                            min="1"
                            step="1"
                            value={updatedOrderLine.quantity.toString()}
                            onChange={onQuantityChange}
                        
                        />
                    </div>
                    
                    <div>
                        <Input 
                            label={"Prix unitaire (" + Currency +")"}
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={updatedOrderLine.unitPrice.toString()}
                            onChange={onUnitPriceChange}
                          
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="secondary" onClick={onCancel}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit}>
                        Modifier
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default EditOrderLine;
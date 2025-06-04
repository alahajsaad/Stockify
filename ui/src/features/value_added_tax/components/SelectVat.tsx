// SelectVat.tsx
import { useCallback, useState } from "react";
import { valueAddedTax } from "src/types";
import { Button } from "src/components/ui";
import Modal from "src/components/ui/Modal";
import VatForm from "src/features/value_added_tax/forms/VatForm";
import List from "@/components/ui/List";
import { useGetVats } from "@/services/api/value_added_tax/hooks";

type SelectVatType = {
    onVatSelect: (vatId: number) => void;
    selectedVatId: number | undefined;
}

const SelectVat: React.FC<SelectVatType> = ({ onVatSelect, selectedVatId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: vats } = useGetVats();
    const [isOpenVatForm, setIsOpenVatForm] = useState<boolean>(false);

    // Trouver la TVA sélectionnée pour l'affichage
    const selectedVat = vats?.find(vat => vat.id === selectedVatId);

    const handleSelect = (vat: valueAddedTax | null) => {
        if (vat?.id) {
            onVatSelect(vat.id);
        }
        setIsOpen(false);
    };

    const toggleDropdown = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative">
            <label className="block mb-1 text-sm font-medium">TVA *</label>
            <div className="flex items-center w-full gap-4">
                <div className="flex-1 bg-gray-50 cursor-pointer border p-2 rounded" onClick={toggleDropdown}>
                    {selectedVat ? `${selectedVat.rate}% - ${selectedVat.description || ''}` : "Sélectionner un taux de TVA"}
                </div>
                <div className="flex-shrink-0">
                    <Button onClick={() => setIsOpenVatForm(true)} variant="add" />
                </div>
            </div>

            <List
                data={vats}
                showedAttribute={["rate", "description"]}
                setSelectedItem={handleSelect}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <Modal 
                title="Ajouter une valeur de TVA" 
                isOpen={isOpenVatForm} 
                onClose={() => setIsOpenVatForm(false)} 
                size="md"
            >
                <VatForm />
            </Modal>
        </div>
    );
};

export default SelectVat;
import { useCallback, useState } from "react";
import { valueAddedTax } from "src/types";
import { ProductFormSchemaType } from "./productForm";
import { Control, Controller } from "react-hook-form";
import List from "src/components/ui/List";
import { useGetValueAddedTaxList } from "src/services/api/value_added_tax";
import { Button } from "src/components/ui";
import Modal from "src/components/ui/Modal";
import VatForm from "src/features/value_added_tax/forms/VatForm";

type ControlledSelectVatProps = {
  name: keyof ProductFormSchemaType; 
  control: Control<ProductFormSchemaType>;
  label?: string;
};

const ControlledSelectVat: React.FC<ControlledSelectVatProps> = ({ control, name }) => {
  const [selectedVat, setSelectedVat] = useState<valueAddedTax>();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetValueAddedTaxList();
  const [isOpenVatForm ,setIsOpenVatForm] = useState<boolean>(false)

  const handleSelect = (vat: valueAddedTax | null) => {
    setSelectedVat(vat || undefined);
    setIsOpen(false);
  };


  const toggleDropdown = useCallback((e) => {
    // Stop event propagation to prevent it from bubbling up
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);
  return (
    <div className="relative">
       <label className="block mb-1 text-sm font-medium">TVA *</label>
      <div className="flex items-center w-full gap-4">
      <div className="flex-1 bg-gray-50 cursor-pointer border p-2 rounded" onClick={toggleDropdown}>
        {selectedVat ? `${selectedVat.rate}% - ${selectedVat.description || ''}` : "Sélectionner un taux de TVA"}
      </div>
      <div className="flex-shrink-0">
          <Button onClick={() => {setIsOpenVatForm(true)}} variant="add"/>
        </div>
        <Modal title="Ajouter une valuer de tax" isOpen={isOpenVatForm} onClose={() => setIsOpenVatForm(false)} size="md">
                <VatForm />
        </Modal>
      </div>
      
       
       

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <List
            data={data}
            showedAttribute={["rate", "description"]}
            setSelectedItem={(item) => {
              // Set the VAT ID in the form field value instead of the entire object
              if (item) {
                field.onChange(item.id);
                handleSelect(item);
              } else {
                field.onChange(null);
                handleSelect(null);
              }
            }}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      />
    </div>
  );
};

export default ControlledSelectVat
import { useCallback, useEffect, useState } from "react";
import { Controller, Control } from "react-hook-form";
import { Button, SearchInput } from "src/components/ui";
import List from "src/components/ui/List";
import { useSearchedCategories } from "src/services/api/category";
import { Category } from "src/types";
import { ProductFormSchemaType } from "./productForm";
import Modal from "src/components/ui/Modal";
import { CategoryForm } from "src/features/category";

type ControlledSearchCategoryProps = {
  name: keyof ProductFormSchemaType; 
  control: Control<ProductFormSchemaType>;
  label?: string;
};

const ControlledSearchCategory: React.FC<ControlledSearchCategoryProps> = ({
  name,
  control,
  label,
}) => {
  const [searchKey, setSearchKey] = useState<string>("");
  const { data = [], isPending, refetch } = useSearchedCategories(searchKey, false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem,setSelectedItem] = useState<Category>()
  const [isOpenCategoryForm ,setIsOpenCategoryForm] = useState<boolean>(false)

  useEffect(() => {
    refetch();
  }, [searchKey, refetch]);

  const onFocus = useCallback(() => {
    if(data){
      setIsOpen(true)
    }
  },[data,setIsOpen]) 
   
  
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative">
          {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
          <div className="flex items-center w-full gap-4">
            <div className="flex-1">
            <SearchInput value={selectedItem?.name} onfocus={onFocus} setSearchKey={setSearchKey} isPending={isPending} />
            </div>
            <div className="flex-shrink-0">
              <Button onClick={() => {setIsOpenCategoryForm(true)}} variant="add"/>
            </div>
            <Modal title="Ajouter category" isOpen={isOpenCategoryForm} onClose={() => setIsOpenCategoryForm(false)} size="md">
                    <CategoryForm />
            </Modal>
          </div>
          <List<Category>
            data={data}
            setSelectedItem={(item) => {
              if (item) {
                setSelectedItem(item);
                // Update the form field value with the category ID
                field.onChange(item.id);
              }
            }}
            showedAttribute={["name"]}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    />
  );
};

export default ControlledSearchCategory;


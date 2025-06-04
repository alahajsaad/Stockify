// SelectCategory.tsx
import { useCallback, useState } from "react";
import { Button, SearchInput } from "src/components/ui";
import Modal from "src/components/ui/Modal";
import List from "@/components/ui/List";
import { useGetCategories } from "@/services/api/category/hooks";
import { Category } from "@/services/api/category/types";
import CategoryForm from "../forms/CategoryForm";

type SelectCategoryType = {
    onCategorySelect: (categoryId: number) => void;
    selectedCategoryId: number | undefined;
}

const SelectCategory: React.FC<SelectCategoryType> = ({ onCategorySelect, selectedCategoryId }) => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const { data: categories, isPending } = useGetCategories({ keyword: searchKey , size : 5});
    const [isOpenCategoryForm, setIsOpenCategoryForm] = useState<boolean>(false);

    // Trouver la catégorie sélectionnée pour l'affichage
    const selectedCategory = categories?.content?.find(cat => cat.id === selectedCategoryId);

    const handleSelect = (category: Category | null) => {
        if (category) {
            onCategorySelect(category.id);
        }
        setIsOpen(false);
    };

    const toggleDropdown = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative">
            <label className="block mb-1 text-sm font-medium">Catégorie *</label>
            <div className="flex items-center w-full gap-4">
                <div className="flex-1"  onClick={toggleDropdown}>
                    
                <SearchInput value={selectedCategory ? selectedCategory.name : ""} setSearchKey={setSearchKey} isPending={isPending} />
                <List
                data={categories?.content}
                showedAttribute={["name"]}
                setSelectedItem={handleSelect}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                 />
                </div>
                <div className="flex-shrink-0">
                    <Button onClick={() => setIsOpenCategoryForm(true)} variant="add" />
                </div>
            </div>

            

            <Modal 
                title="Ajouter une catégorie" 
                isOpen={isOpenCategoryForm} 
                onClose={() => setIsOpenCategoryForm(false)} 
                size="md"
            >
                <CategoryForm />
            </Modal>
        </div>
    );
};

export default SelectCategory;
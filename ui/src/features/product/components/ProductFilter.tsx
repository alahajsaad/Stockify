import { List } from "lucide-react";
import { Controller } from "react-hook-form";
import { Button, SearchInput } from "src/components/ui";
import { useSearchProduct } from "src/services/api/product";

const ProductFilter : React.FC = () => {
      const { data = [], isPending, refetch } = useSearchProduct(searchKey, false);
    
    return (
        <div className="card">
            <div className="flex items-center flex-wrap gap-2">
                <div>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div className="relative">
                        <div className="flex items-center w-full gap-4">
                        <SearchInput value={selectedItem?.name} onfocus={onFocus} setSearchKey={setSearchKey} isPending={isPending} />
                            
                            
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
                </div>
                <div></div>
            </div>
            <div></div>
        </div>
    );
}
export default ProductFilter ;
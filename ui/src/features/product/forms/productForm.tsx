import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "src/components/ui";
import SearchInputV2 from "src/components/ui/inputs/SearchInputV2";
import { z } from "zod";
import { useState } from "react";
import { useValueAddedTax, valueAddedTax } from "src/services/api/value_added_tax";

// Example category data type
interface Category {
  id: string;
  name: string;
}

// Example function to fetch categories
const fetchCategories = async (): Promise<Category[]> => {
  // Replace this with your actual API call
  return [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Food" },
    { id: "4", name: "abc" },
    { id: "5", name: "abcd" },
    { id: "6", name: "abcdef" },
  ];
};

const formSchema = z.object({
  designation: z.string().min(1, "Designation is required"),
  reference: z.string().min(1, "Reference is required"),
  category: z.string().min(1, "Category is required"),
  criticalThreshold: z.number().min(1, "definir une seuil de stock pour le alerte de fin de stock"),
  valueAddedTax: z.number()
});

type FormValues = z.infer<typeof formSchema>;

const ProductForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedVat, setSelectedVat] = useState<valueAddedTax | null>(null);
  const [showVatDropdown, setShowVatDropdown] = useState(false);
  const { data: vatList } = useValueAddedTax();
  
  const { 
    register, 
    handleSubmit, 
    control,
    setValue,
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  
  const handleFormSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setValue("category", category.id, { shouldValidate: true });
  };
  
  const handleVatSelect = (vat: valueAddedTax) => {
    setSelectedVat(vat);
    setValue("valueAddedTax", vat.id, { shouldValidate: true });
    setShowVatDropdown(false); // Hide dropdown after selection
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Input label="Nom d'article *" {...register("designation")} />
        {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
      </div>

      <div>
        <Input label="Reference *" {...register("reference")} />
        {errors.reference && <p className="text-red-500">{errors.reference.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Category *</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div>
              <SearchInputV2<Category>
                queryKey="categories"
                queryFn={fetchCategories}
                displayKey="name"
                handleSelect={(category) => {
                  handleCategorySelect(category);
                }}
              />
              <input type="hidden" {...field} />
            </div>
          )}
        />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>

      <div className="relative">
        <label className="block mb-1 text-sm font-medium">TVA *</label>
        <div 
          className="cursor-pointer border p-2 rounded"
          onClick={() => setShowVatDropdown(!showVatDropdown)}
        >
          {selectedVat ? `${selectedVat.rate}% - ${selectedVat.description}` : "Sélectionner un taux de TVA"}
        </div>
        
        <Controller
          name="valueAddedTax"
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        
        {showVatDropdown && (
          <ul className="w-full mt-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white absolute z-10">
            {vatList && vatList.map((vat) => (
              <li
                key={vat.id}
                className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                onClick={() => handleVatSelect(vat)}
              >
                {vat.rate}% - {vat.description}
              </li>
            ))}
          </ul>
        )}
        {errors.valueAddedTax && <p className="text-red-500">{errors.valueAddedTax.message}</p>}
      </div>

      <div>
        <Input 
          type="number" 
          label="seuil critique de stock *" 
          placeholder="5" 
          {...register("criticalThreshold", { valueAsNumber: true })} 
        />
        {errors.criticalThreshold && <p className="text-red-500">{errors.criticalThreshold.message}</p>}
      </div>
      
      <div className="flex justify-end mt-4">
        <Button type="submit">
          Ajouter
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
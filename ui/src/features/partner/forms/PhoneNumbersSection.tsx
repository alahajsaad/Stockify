import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ClientForm, SupplierForm } from "@/lib/formSchema";
import { Plus, Trash, Phone } from "lucide-react";
import { Button } from "../../../components/ui";

interface PhoneNumbersSectionProps {
  form: UseFormReturn<ClientForm | SupplierForm>;
}

const PhoneNumbersSection = ({ form }: PhoneNumbersSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phoneNumbers",
  });

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Numéros de téléphone</h3>
        <Button
          type="button"
          onClick={() =>
            append({
              number: "",
            })
          }
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Ajouter un numéro
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="flex items-center justify-center p-6 border border-dashed rounded-md">
          <div className="flex flex-col items-center text-muted-foreground">
            <Phone className="h-8 w-8 mb-2" />
            <p>Aucun numéro de téléphone ajouté pour le moment</p>
            <Button
              onClick={() =>
                append({
                  number: "",
                })
              }
              className="mt-2"
            >
              Ajouter un numéro de téléphone
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-md bg-card">
              <div className="flex-1">
                <label htmlFor={`phoneNumbers.${index}.number`} className="block text-sm font-medium mb-2">
                  Numéro de téléphone
                </label>
                <input
                  id={`phoneNumbers.${index}.number`}
                  type="tel"
                  //placeholder="99666333"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  {...form.register(`phoneNumbers.${index}.number`)}
                />
                {form.formState.errors.phoneNumbers?.[index]?.number && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.phoneNumbers[index]?.number?.message}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneNumbersSection;
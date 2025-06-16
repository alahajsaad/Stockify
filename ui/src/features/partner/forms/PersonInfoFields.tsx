import { ClientForm } from "@/lib/formSchema";
import { UseFormReturn } from "react-hook-form";

interface PersonInfoFieldsProps {
  form: UseFormReturn<ClientForm>;
}

const PersonInfoFields = ({ form }: PersonInfoFieldsProps) => {
  // Helper function to safely get person errors
  const getPersonError = (field: 'firstName' | 'lastName') => {
    const basicInfoErrors = form.formState.errors.basicInfo;
    if (basicInfoErrors && 'firstName' in basicInfoErrors) {
      return (basicInfoErrors as any)[field]?.message;
    }
    return undefined;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="basicInfo.firstName" className="block text-sm font-medium mb-2">
          Prénom <span className="text-destructive">*</span>
        </label>
        <input
          id="basicInfo.firstName"
          type="text"
          //placeholder="John"
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          {...form.register("basicInfo.firstName")}
        />
        {getPersonError('firstName') && (
          <p className="text-sm text-destructive mt-1">
            {getPersonError('firstName')}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="basicInfo.lastName" className="block text-sm font-medium mb-2">
          Nom <span className="text-destructive">*</span>
        </label>
        <input
          id="basicInfo.lastName"
          type="text"
          //placeholder="Doe"
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          {...form.register("basicInfo.lastName")}
        />
        {getPersonError('lastName') && (
          <p className="text-sm text-destructive mt-1">
            {getPersonError('lastName')}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonInfoFields;
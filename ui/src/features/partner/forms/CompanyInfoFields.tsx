import { ClientForm } from "@/lib/formSchema";
import { UseFormReturn } from "react-hook-form";

interface CompanyInfoFieldsProps {
  form: UseFormReturn<ClientForm>;
}

const CompanyInfoFields = ({ form }: CompanyInfoFieldsProps) => {
  // Helper function to safely get company errors
  const getCompanyError = (field: 'companyName' | 'registrationNumber' | 'taxNumber') => {
    const basicInfoErrors = form.formState.errors.basicInfo;
    if (basicInfoErrors && 'companyName' in basicInfoErrors) {
      return (basicInfoErrors as any)[field]?.message;
    }
    return undefined;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="basicInfo.companyName" className="block text-sm font-medium mb-2">
          Nom de l'entreprise <span className="text-destructive">*</span>
        </label>
        <input
          id="basicInfo.companyName"
          type="text"
         // placeholder="Acme Corporation"
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          {...form.register("basicInfo.companyName")}
        />
        {getCompanyError('companyName') && (
          <p className="text-sm text-destructive mt-1">
            {getCompanyError('companyName')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="basicInfo.registrationNumber" className="block text-sm font-medium mb-2">
          Numéro d'enregistrement <span className="text-destructive">*</span>
        </label>
        <input
          id="basicInfo.registrationNumber"
          type="text"
         // placeholder="123456789"
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          {...form.register("basicInfo.registrationNumber")}
        />
        {getCompanyError('registrationNumber') && (
          <p className="text-sm text-destructive mt-1">
            {getCompanyError('registrationNumber')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="basicInfo.taxNumber" className="block text-sm font-medium mb-2">
          Numéro fiscal
        </label>
        <input
          id="basicInfo.taxNumber"
          type="text"
         // placeholder="Tax ID Number"
          className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          {...form.register("basicInfo.taxNumber")}
        />
        {getCompanyError('taxNumber') && (
          <p className="text-sm text-destructive mt-1">
            {getCompanyError('taxNumber')}
          </p>
        )}
      </div>
    </div>
  );
};

export default CompanyInfoFields;
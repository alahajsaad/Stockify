import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from "@/components/ui/shadcn/separator";
import { ClientForm, clientFormSchema, EntityType } from '@/lib/formSchema';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button, Input } from '@/components/ui';
import EntityTypeSelection from '../forms/EntityTypeSelection';
import PersonInfoFields from '../forms/PersonInfoFields';
import CompanyInfoFields from '../forms/CompanyInfoFields';
import PhoneNumbersSection from '../forms/PhoneNumbersSection';
import AddressesSection from '../forms/AddressesSection';
import { useAddPerson } from '@/services/api/partner/person/hooks';
import { useAddOrganization } from '@/services/api/partner/organization/hooks';
import { Organization, Person } from '@/services/api/partner/types';
import { toast } from 'react-toastify';

const AddSupplierPage = () => {
  const { mutate: addPerson, isPending: isAddPersonPending } = useAddPerson();
  const { mutate: addOrganization, isPending: isAddOrganizationPending } = useAddOrganization();
  const isPending = isAddPersonPending || isAddOrganizationPending;
  
  const form = useForm<ClientForm>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      entityType: "COMPANY",
      email: "",
      phoneNumbers: [
        {
          number: "",
        }
      ],
      addresses: [
        {
          streetAddress: "",
          city: ""
        }
      ],
      basicInfo: {
        firstName: '',
        lastName: '',
      },
    },
  });
  
  const entityType = form.watch('entityType');
  
  const handleEntityTypeChange = (value: EntityType) => {
    form.setValue('entityType', value);
    if (value === 'PERSON') {
      form.setValue('basicInfo', {
        firstName: '',
        lastName: '',
      });
    } else {
      form.setValue('basicInfo', {
        companyName: '',
        registrationNumber: '',
        taxNumber: '',
      });
    }
  };
  
  const resetForm = () => {
    form.reset({
      entityType: "PERSON",
      email: "",
      phoneNumbers: [{ number: "" }],
      addresses: [{ streetAddress: "", city: "" }],
      basicInfo: {
        firstName: '',
        lastName: '',
      },
    });
  };

  const onSubmit = async (data: ClientForm) => {
    let query: Person | Organization;
    
    if (data.entityType === "PERSON") {
      query = {
        partnerType: "SUPPLIER",
        entityType:"PERSON",
        email: data.email,
        phoneNumbers: data.phoneNumbers,
        addresses: data.addresses,
        firstName: data.basicInfo.firstName,
        lastName: data.basicInfo.lastName
      };

      addPerson(query, {
        onSuccess: () => {
          toast.success("Nouveau fournisseur ajouté avec succès");
          resetForm();
        },
        onError: () => {
          toast.error("Erreur lors de l'ajout du fournisseur");
        }
      });
    } else {
      query = {
        partnerType: "SUPPLIER",
        entityType:"ORGANIZATION",
        email: data.email,
        phoneNumbers: data.phoneNumbers,
        addresses: data.addresses,
        companyName: data.basicInfo.companyName,
        registrationNumber: data.basicInfo.registrationNumber,
        taxNumber: data.basicInfo.taxNumber
      };

      addOrganization(query, {
        onSuccess: () => {
          toast.success("Nouveau fournisseur ajouté avec succès");
          resetForm();
        },
        onError: () => {
          toast.error("Erreur lors de l'ajout du fournisseur");
        }
      });
    }
    
    console.log('Données du formulaire à soumettre:', query);
  };
  
  return (
    <div className="container mx-auto animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <p>Informations du fournisseur</p>
        </CardHeader>
        
        <CardBody>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Sélection du type d'entité */}
            <EntityTypeSelection 
              value={entityType} 
              onChange={handleEntityTypeChange}
            />
            
            <Separator />
            
            {/* Section informations de base */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
              
              {entityType === "PERSON" ? (
                <PersonInfoFields form={form} />
              ) : (
                <CompanyInfoFields form={form} />
              )}
              
              {/* Champ Email */}
              <div className="mt-4">
                <Input 
                  type="email" 
                  label='E-mail*' 
                  placeholder='email@exemple.com' 
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.email?.message}
                  </p>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Section informations de contact */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
              <PhoneNumbersSection form={form} />
              <Separator className="my-6" />
              <AddressesSection form={form} />
            </div>
    
            <Separator />
            <div className="flex justify-end gap-4 pt-6">
              <Button disabled={isPending} type="submit">
                <p>{isPending ? "Ajout en cours..." : "Ajouter le fournisseur"}</p>
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddSupplierPage;
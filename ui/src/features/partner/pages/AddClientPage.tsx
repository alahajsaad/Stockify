import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientForm, clientFormSchema, EntityType } from '@/lib/formSchema';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import EntityTypeSelection from '../forms/EntityTypeSelection';
import PersonInfoFields from '../forms/PersonInfoFields';
import CompanyInfoFields from '../forms/CompanyInfoFields';
import PhoneNumbersSection from '../forms/PhoneNumbersSection';
import AddressesSection from '../forms/AddressesSection';
import { useAddPerson } from '@/services/api/partner/person/hooks';
import { useAddOrganization } from '@/services/api/partner/organization/hooks';
import { Organization, Person } from '@/services/api/partner/types';
import { toast } from 'react-toastify';



const AddClientPage = () => {
  const {mutate : addPerson , isPending : isAddPersonPending } = useAddPerson()
  const {mutate : addOrganization , isPending : isAddOrganizationPending } = useAddOrganization()
  const isPending = isAddPersonPending || isAddOrganizationPending
  const form = useForm<ClientForm>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      entityType: "PERSON",
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
        //entityType: 'PERSON',
      });
    } else {
      form.setValue('basicInfo', {
        companyName: '',
        registrationNumber: '',
        taxNumber: '',
        //entityType: 'COMPANY',
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
        //entityType: 'PERSON',
      },
    });
  }


  const onSubmit = async (data: ClientForm) => {
    let querry : Person | Organization;
    
    if (data.entityType === "PERSON") {
      querry  = {
        partnerType: "CLIENT",
        entityType:"PERSON",
        email: data.email,
        phoneNumbers: data.phoneNumbers,
        addresses: data.addresses,
        firstName: data.basicInfo.firstName,
        lastName: data.basicInfo.lastName
      };

      addPerson(querry,{
        onSuccess: () => {
          toast.success("nouveau client ajouter avec success")
          resetForm()
        }
      }

      )
    } else {
      querry = {
        partnerType: "CLIENT",
        entityType:"ORGANIZATION",
        email: data.email,
        phoneNumbers: data.phoneNumbers,
        addresses: data.addresses,
        companyName: data.basicInfo.companyName,
        registrationNumber: data.basicInfo.registrationNumber,
        taxNumber: data.basicInfo.taxNumber
      };

      addOrganization(querry,{
        onSuccess: () => {
          toast.success("nouveau client ajouter avec success")
          resetForm()
        }
      })
    }
    
    console.log('Form data to submit:', querry);
    
    
  };
  
  return (
    <div className="container mx-auto animate-fade-in">
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <Card>
           <CardBody>
              <EntityTypeSelection 
                value={entityType} 
                onChange={handleEntityTypeChange}
              />
           </CardBody>
        </Card>
        <h2 className="text-2xl font-bold text-gray-900">Informations de base</h2>
        <Card>
          <CardBody>
               {/* Basic Information Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Informations de base</h2>
              
              {entityType === "PERSON" ? (
                <PersonInfoFields form={form} />
              ) : (
                <CompanyInfoFields form={form} />
              )}
              
              {/* Email Field */}
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.email?.message}
                  </p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
         <h2 className="text-2xl font-bold text-gray-900">Coordonnées</h2>
        <Card>
          <CardBody>
             
            
              <PhoneNumbersSection form={form} />
                </CardBody>
        </Card>
        <Card>
          <CardBody>
              
              <AddressesSection form={form} />
          
    
           </CardBody>
        </Card>
            <div className="flex justify-end gap-4 pt-6">
              <Button disabled={isPending} type="submit">
                <p>{isPending ? "ajout ..." :"Ajouter client"}</p>
              </Button>
            </div>
         

       
       </form>
    </div>
  );
};

export default AddClientPage;
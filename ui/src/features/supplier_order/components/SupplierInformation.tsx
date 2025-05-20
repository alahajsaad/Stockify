import { useEffect, useState } from "react";
import { Button, SearchInput } from "src/components/ui";
import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import List from "src/components/ui/List";
import Modal from "src/components/ui/Modal";
import SupplierForm from "src/features/supplier/forms/SupplierForm";
import { useGetSuppliers } from "src/services/api/supplier";
import { Supplier } from "src/types/supplier";

type SupplierInformationProps = {
  supplier?: Supplier;
  setSupplier: (supplier: Supplier) => void;
}

const SupplierInformation: React.FC<SupplierInformationProps> = ({ 
  supplier, 
  setSupplier 
}) => {
  const [searchKey, setSearchKey] = useState<string>('');    
  const { data: suppliers, isPending, refetch } = useGetSuppliers({ 
    keyWord: searchKey,
    page: 0,
    size: 10 
  });
  const [isOpenSupplierForm, setIsOpenSupplierForm] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchKey(value);
    // Only open the dropdown if there's search text
    if (value.trim() !== '') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Handle supplier selection
  const handleSupplierSelect = (selectedSupplier: Supplier | null) => {
    if (selectedSupplier) {
      setSupplier(selectedSupplier);
      setIsOpen(false);
      setSearchKey(''); // Clear search after selection
    }
  };

  // Handle change button click
  const handleChangeSupplier = () => {
    setSupplier(undefined as any); // Reset supplier selection
    setSearchKey('');
    setIsOpen(false);
  };

  // Auto-refetch when searchKey changes
  useEffect(() => {
    if (searchKey) {
      refetch();
    }
  }, [searchKey, refetch]);

  return (
    <Card>
        <CardHeader>
               <h2 className="text-lg font-semibold">Information fournisseur</h2>
        </CardHeader>
        <CardBody>
            {supplier ? (
        <div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="text-lg font-bold">
              {supplier.firstName + " " + supplier.lastName}
            </p>
            <Button onClick={handleChangeSupplier}>Changer</Button>
          </div>
          <p>Email: {supplier.email}</p>
          <p>
            Téléphone: {supplier.phoneNumbers?.map((phone, index) => 
              (index > 0 ? " / " : "") + phone.number
            ).join("")}
          </p>
          <p>Adresse: {supplier.address}</p>
        </div>
      ) : (
        <div className="relative">
          <SearchInput 
            placeholder="Rechercher un fournisseur..." 
            setSearchKey={handleSearchChange}
            isPending={isPending}
          />
          
          <List 
            data={suppliers?.data?.content} 
            setSelectedItem={handleSupplierSelect} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            showedAttribute={["firstName", "email"]}
          />
          
          <p className="text-muted-foreground text-sm text-center">ou</p>
          <Button onClick={() => setIsOpenSupplierForm(true)}>
            Ajouter un nouveau fournisseur
          </Button>
           
          <Modal title="Ajouter un nouveau fournisseur" isOpen={isOpenSupplierForm} onClose={() => setIsOpenSupplierForm(false)} size="md">
            <SupplierForm onUpdateSuccess={setIsOpenSupplierForm}/>
          </Modal>
        </div>
      )}
        </CardBody>
      
    </Card>
  );
};

export default SupplierInformation;
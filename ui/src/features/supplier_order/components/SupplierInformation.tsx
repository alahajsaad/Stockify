import { Paths } from "@/lib/paths";
import { useGetPartners } from "@/services/api/partner/hooks";
import {  PartnerResponseDto, ShowPartnerDto } from "@/services/api/partner/types";
import { getShowPartnerDtos } from "@/services/api/partner/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, SearchInput } from "src/components/ui";
import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import List from "src/components/ui/List";


type SupplierInformationProps = {
  supplier?: PartnerResponseDto;
  setSupplier: (partner : PartnerResponseDto | undefined) => void;
}

const SupplierInformation: React.FC<SupplierInformationProps> = ({ supplier, setSupplier }) => {
  const navigate = useNavigate()
  const [searchKey, setSearchKey] = useState<string>('');    
  const { data: suppliers, isPending, refetch } = useGetPartners({
    keyword: searchKey,
    partnerType: "SUPPLIER",
    page: 0,
    size: 10
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ShowPartnerDtos : ShowPartnerDto[] = getShowPartnerDtos(suppliers?.content || [])
  const currentSupplier = ShowPartnerDtos?.find((supp)=>supp.id === supplier?.id)
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
  const handleSupplierSelect = (selectedSupplier: ShowPartnerDto | null) => {
    if (selectedSupplier) {
      setSupplier(suppliers?.content.find((supp)=> supp.id === selectedSupplier.id));
      setIsOpen(false);
      setSearchKey(''); // Clear search after selection
    }
  };

  // Handle change button click
  const handleChangeSupplier = () => {
    setSupplier(undefined); 
    setSearchKey('');
    setIsOpen(false);
  };

  
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
              {currentSupplier?.partnerName}
            </p>
            <Button onClick={handleChangeSupplier}>Changer</Button>
          </div>
          <p>Email: {currentSupplier?.email}</p>
          <p>Type: {currentSupplier?.entityType}</p>
        </div>
      ) : (
        <div className="relative">
          <SearchInput 
            placeholder="Rechercher un fournisseur..." 
            setSearchKey={handleSearchChange}
            isPending={isPending}
          />
          
          <List 
            data={ShowPartnerDtos} 
            setSelectedItem={handleSupplierSelect} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            showedAttribute={["partnerName"]}
          />
          
          <p className="text-muted-foreground text-sm text-center">ou</p>
          <Button className="w-full" onClick={() => navigate("/stockify/"+Paths.addSupplier)}>
            Ajouter un nouveau fournisseur
          </Button>
          
        </div>
      )}
        </CardBody>
      
    </Card>
  );
};

export default SupplierInformation;
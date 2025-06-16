import { Paths } from "@/lib/paths";
import { useGetPartners } from "@/services/api/partner/hooks";
import { DynamicPartner, EntityType, PartnerType } from "@/services/api/partner/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, SearchInput } from "src/components/ui";
import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import List from "src/components/ui/List";

export type DistractedDynamicPartner = {
    id: number;
    partnerName: string;
    entityType: EntityType;
    email: string;
}

const getPartnerName = (partner: DynamicPartner): string => {
  if (partner.entityType === 'PERSON') {
    const firstName = partner.firstName ?? '';
    const lastName = partner.lastName ?? '';
    return `${firstName} ${lastName}`.trim();
  } else {
    return partner.companyName ?? '';
  }
};

export const getDistractedDynamicPartner = (partners: DynamicPartner[]): DistractedDynamicPartner[] => {
  return partners.map((partner) => ({
    id: partner.id,
    partnerName: getPartnerName(partner),
    entityType: partner.entityType, 
    email: partner.email,
  }));
};

type PartnerInformationProps = {
  partner?: DynamicPartner;
  setPartner: (partner: DynamicPartner | undefined) => void;
  partnerType: PartnerType;
}

const PartnerInformation: React.FC<PartnerInformationProps> = ({ partner, setPartner, partnerType }) => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState<string>('');    
  const { data: partners, isPending, refetch } = useGetPartners({
    keyword: searchKey,
    partnerType: partnerType,
    page: 0,
    size: 10
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const PartnerDtos: DistractedDynamicPartner[] = getDistractedDynamicPartner(partners?.content || []);
  const targetPath = "/stockify/" + (partnerType === "SUPPLIER" ? Paths.addSupplier : Paths.addClient);

  const handleSearchChange = (value: string) => {
    setSearchKey(value);
    // Only open the dropdown if there's search text
    if (value.trim() !== '') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Handle partner selection
  const handlePartnerSelect = (selectedPartner: DistractedDynamicPartner | null) => {
    if (selectedPartner) {
      setPartner(partners?.content.find((partner) => partner.id === selectedPartner.id));
      setIsOpen(false);
      setSearchKey(''); // Clear search after selection
    }
  };

  // Handle change button click
  const handleChangeSupplier = () => {
    setPartner(undefined); 
    setSearchKey('');
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchKey) {
      refetch();
    }
  }, [searchKey, refetch]);

  // Get the display name for the selected partner
  const getDisplayName = (partner: DynamicPartner): string => {
    if (partner.entityType === "PERSON") {
      return partner.fullName || `${partner.firstName} ${partner.lastName}`.trim();
    } else {
      return partner.companyName;
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Information fournisseur</h2>
      </CardHeader>
      <CardBody>
        {partner ? (
          <div>
            <div className="flex flex-wrap items-center justify-between">
              <p className="text-lg font-bold">
                {getDisplayName(partner)}
              </p>
              <Button onClick={handleChangeSupplier}>Changer</Button>
            </div>
            <p>Email: {partner.email}</p>
            <p>Type: {partner.entityType === "PERSON" ? "Personne" : "Organisation"}</p>
            {partner.entityType === "ORGANIZATION" && (
              <>
                <p>Numéro d'enregistrement: {partner.registrationNumber}</p>
                <p>Numéro fiscal: {partner.taxNumber}</p>
              </>
            )}
          </div>
        ) : (
          <div className="relative">
            <SearchInput
              placeholder={partnerType === "SUPPLIER" ? "Rechercher un fournisseur..." : "Rechercher un client..."}
              setSearchKey={handleSearchChange}
              isPending={isPending}
            />
            
            <List
              data={PartnerDtos}
              setSelectedItem={handlePartnerSelect}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              showedAttribute={["partnerName"]}
            />
            
            <p className="text-muted-foreground text-sm text-center">ou</p>

            <Button className="w-full" onClick={() => navigate(targetPath)}>
                {partnerType === "SUPPLIER" ? "Ajouter un nouveau fournisseur" : "Ajouter un nouveau client"}
            </Button>

          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default PartnerInformation;
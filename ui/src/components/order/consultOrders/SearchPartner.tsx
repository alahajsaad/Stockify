import { SearchInput } from "@/components/ui";
import List from "@/components/ui/List";
import { useGetPartners } from "@/services/api/partner/hooks";
import { DynamicPartner, EntityType, PartnerType } from "@/services/api/partner/types";
import { useEffect, useState } from "react";

// Use the same type from PartnerInformation
export type DistractedDynamicPartner = {
    id: number;
    partnerName: string;
    entityType: EntityType;
    email: string;
}

// Use the same utility functions from PartnerInformation
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

type SearchPartnerProps = {
    partnerType: PartnerType;
    setPartner: (partner: DynamicPartner | undefined) => void;
   
}

const SearchPartner: React.FC<SearchPartnerProps> = ({ partnerType, setPartner }) => {
    const [searchKey, setSearchKey] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const { data: partners, isPending, refetch } = useGetPartners({
        keyword: searchKey,
        partnerType: partnerType,
        page: 0,
        size: 10
    });

    // Use the same data transformation as PartnerInformation
    const PartnerDtos: DistractedDynamicPartner[] = getDistractedDynamicPartner(partners?.content || []);

    const handleSearchChange = (value: string) => {
        setSearchKey(value);
        // Only open the dropdown if there's search text
        if (value.trim() !== '') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    // Handle partner selection - matches PartnerInformation logic
    const handlePartnerSelect = (selectedPartner: DistractedDynamicPartner | null) => {
        if (selectedPartner) {
            setPartner(partners?.content.find((partner) => partner.id === selectedPartner.id));
            setIsOpen(false);
            setSearchKey(selectedPartner.partnerName); // Clear search after selection
        }
    };

    // Add the useEffect for refetching like in PartnerInformation
    useEffect(() => {
        if (searchKey) {
            refetch();
        }
    }, [searchKey, refetch]);

    return (
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
        </div>
    );
}

export default SearchPartner;
import { SearchInput } from "@/components/ui";
import List from "@/components/ui/List";
import { useGetPartners } from "@/services/api/partner/hooks";
import { DynamicPartner, EntityType, PartnerType } from "@/services/api/partner/types";
import { useCallback, useEffect, useRef, useState } from "react";

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
    partner:DynamicPartner | undefined
   
}

const SearchPartner: React.FC<SearchPartnerProps> = ({ partnerType, setPartner ,partner}) => {
    const [searchKey, setSearchKey] = useState<string>('');
    const [displayValue, setDisplayValue] = useState<string>(''); // Separate display value
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedPartner, setSelectedPartner] = useState<DistractedDynamicPartner | null>(null);
    useEffect(()=>{
        if(partner === null){
            setSelectedPartner(null)
            setDisplayValue('')
        }
    },[partner]) 


    const justSelected = useRef(false);

    console.log("isOpen : " + isOpen)
    const { data: partners, isPending, refetch } = useGetPartners({
        keyword: searchKey,
        partnerType: partnerType,
        page: 0,
        size: 10
    });

    const PartnerDtos: DistractedDynamicPartner[] = getDistractedDynamicPartner(partners?.content || []);

    const handleSearchChange = useCallback((value: string)=>{
        // Prevent opening immediately after selection
        if (justSelected.current) {
            justSelected.current = false;
            return;
        }
        setDisplayValue(value);
        setSearchKey(value);
        setSelectedPartner(null); // Clear selection when typing
        
        // Only open the dropdown if there's search text
        if (value.trim() !== '') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    } ,[])

    const handlePartnerSelect = (selectedPartner: DistractedDynamicPartner) => {
            justSelected.current = true; // Prevent immediate reopen
            setSelectedPartner(selectedPartner);
            setPartner(partners?.content.find((partner) => partner.id === selectedPartner.id));
            setDisplayValue(selectedPartner.partnerName);
            setIsOpen(false);
           
    };

   
    const handleFocus = () => {
        if (selectedPartner) {
            setSelectedPartner(null);
            setDisplayValue('');
            setSearchKey('');
        }
        // Open dropdown if there's text to search
        if (displayValue.trim() !== '' ) {
            setIsOpen(true);
             console.log("isOpen form handle focus: " + isOpen)
        }
       
    };

    useEffect(() => {
        if (searchKey && !selectedPartner) {
            refetch();
        }
    }, [searchKey, refetch, selectedPartner]);

    return (
        <div className="relative">
            <SearchInput
                placeholder={partnerType === "SUPPLIER" ? "Rechercher un fournisseur..." : "Rechercher un client..."}
                setSearchKey={handleSearchChange}
                isPending={isPending}
                value={displayValue}
                onfocus={handleFocus}
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
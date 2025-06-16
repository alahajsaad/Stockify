import { SearchInput } from "@/components/ui";
import List from "@/components/ui/List";
import { useGetPartners } from "@/services/api/partner/hooks";
import { DynamicPartner, PartnerType, ShowPartnerDto } from "@/services/api/partner/types";
import { getShowPartnerDtos } from "@/services/api/partner/utils";
import { useState } from "react";

type SearchPartnerProps = {
    partnerType: PartnerType;
    setPartner: (partner: DynamicPartner | undefined) => void;
}

const SearchPartner: React.FC<SearchPartnerProps> = ({ partnerType, setPartner }) => {
    const [searchKey, setSearchKey] = useState<string>('');    
    const [selectedPartner, setSelectedPartner] = useState<ShowPartnerDto | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data: partners, isPending } = useGetPartners({
        keyword: searchKey,
        partnerType: partnerType,
        page: 0,
        size: 10
    });

    const ShowPartnerDtos: ShowPartnerDto[] = getShowPartnerDtos(partners?.content || []);

    const handleSearchChange = (value: string) => {
        setSearchKey(value);
        
        // Clear selected partner when user starts typing
        if (selectedPartner && value !== selectedPartner.partnerName) {
            setSelectedPartner(null);
            setPartner(undefined);
        }
        
        // Only open the dropdown if there's search text
        if (value.trim() !== '') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };
   
    const handlePartnerSelect = (selectedPartnerDto: ShowPartnerDto | null) => {
        if (selectedPartnerDto) {
            const fullPartner = partners?.content.find((partner) => partner.id === selectedPartnerDto.id);
            setPartner(fullPartner);
            setSelectedPartner(selectedPartnerDto);
            setIsOpen(false);
            setSearchKey(selectedPartnerDto.partnerName); 
        }
    };

    // Handle clearing the selection
    const handleClear = () => {
        setSelectedPartner(null);
        setPartner(undefined);
        setSearchKey('');
        setIsOpen(false);
    };

    return (
        <>
            <SearchInput 
                placeholder="Rechercher un partenaire..." 
                setSearchKey={handleSearchChange}
                isPending={isPending}
                value={searchKey}
               
            />
            
            <List 
                data={ShowPartnerDtos} 
                setSelectedItem={handlePartnerSelect} 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                showedAttribute={["partnerName"]}
            />
        </>
    );
}

export default SearchPartner;
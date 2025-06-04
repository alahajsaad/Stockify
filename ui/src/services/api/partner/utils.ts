import { PartnerResponseDto, ShowPartnerDto } from "./types";

//  const getPartnerName = (partner : PartnerResponseDto) => {
//         if(partner.entityType === 'PERSON'){
//             return partner.firstName + " " + partner.lastName
//         } else {
//             return partner.companyName
//         }
//     }

// export const getShowPartnerDtos = (partnerResponseDto : PartnerResponseDto[]) =>{
//     const formattedData: ShowPartnerDto[] = partnerResponseDto.map((partner) => ({
//         id: partner.id,
//         partnerName: getPartnerName(partner),
//         entityType:partner.entityType,
//         email: partner.email,
//     }));
//     return formattedData 

// }

const getPartnerName = (partner: PartnerResponseDto): string => {
  if (partner.entityType === 'PERSON') {
    const firstName = partner.firstName ?? '';
    const lastName = partner.lastName ?? '';
    return `${firstName} ${lastName}`.trim();
  } else {
    return partner.companyName ?? '';
  }
};


export const getShowPartnerDtos = (partnerResponseDto: PartnerResponseDto[]): ShowPartnerDto[] => {
  return partnerResponseDto.map((partner) => ({
    id: partner.id,
    partnerName: getPartnerName(partner),
    entityType:partner.entityType, 
    email: partner.email,
  }));
};
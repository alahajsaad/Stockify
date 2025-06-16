import { DynamicPartner, ShowPartnerDto } from "./types";



const getPartnerName = (partner: DynamicPartner): string => {
  if (partner.entityType === 'PERSON') {
    const firstName = partner.firstName ?? '';
    const lastName = partner.lastName ?? '';
    return `${firstName} ${lastName}`.trim();
  } else {
    return partner.companyName ?? '';
  }
};


export const getShowPartnerDtos = (dynamicPartner: DynamicPartner[]): ShowPartnerDto[] => {
  return dynamicPartner.map((partner) => ({
    id: partner.id,
    partnerName: getPartnerName(partner),
    entityType:partner.entityType, 
    email: partner.email,
  }));
};
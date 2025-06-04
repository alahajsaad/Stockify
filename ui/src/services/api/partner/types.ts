
export type PartnerType ='CLIENT' |'SUPPLIER' 
export type EntityType = "PERSON" | "ORGANIZATION"
export type Address = {
    id?:number
    city:string
    streetAddress: string
}
export type PhoneNumber = {
    id?:number
    number:number
}

export type Partner = {
    createdAt?:string
    updatedAt?:string
    id?:number
    partnerType:PartnerType
    entityType? : EntityType
    email:string
    phoneNumbers:PhoneNumber[]
    addresses:Address[]
}

export type Organization = Partner & {
    companyName: string
    registrationNumber: string 
    taxNumber: string 

};

export type  Person= Partner & {
    firstName: string
    lastName: string 

};

export type GetOrganizationsParams = {
  keyword?: string;
  partnerType?:PartnerType
  page?: number;
  size?: number;
}

export type GetPersonsParams = {
  keyword?: string;
  partnerType?:PartnerType
  page?: number;
  size?: number;
};

export interface PartnerResponseDto {
  id: number;
  partnerType: PartnerType;
  entityType : EntityType
  email: string;
  createdAt: string; 
  updatedAt: string; 

  // Person fields (nullable if organization)
  firstName?: string | null;
  lastName?: string | null;

  // Organization fields (nullable if person)
  companyName?: string | null;
  registrationNumber?: string | null;
  taxNumber?: string | null;
}

export type ShowPartnerDto = {
    id:number
    partnerName : string
    entityType : EntityType
    email : string
}



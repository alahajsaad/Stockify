
export type RoleType ='CLIENT' |'SUPPLIER' 

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
    roleType:RoleType
    entityType? : "PERSON" | "ORGANIZATION"
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
  roleType?: RoleType;
  page?: number;
  size?: number;
}

export type GetPersonsParams = {
  keyword?: string;
  roleType?: RoleType;
  page?: number;
  size?: number;
};



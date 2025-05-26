export type CompanyCreationDto = {
  id?:number
  name: string;
  taxNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode : string,
  logo?: File;
};




export type CompanyResponseDto = {
  id : number;
  name : string ;
  taxNumber : string
  email : string ;
  phone : string;
}

export type Company = {
  id: number; 
  name: string;
  taxNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  logo: string;
  numberOfUser: number;
  isNew: boolean;
  tenantId: string;
  subscription: 'STANDARD_ANNUAL' | 'FIFTEEN_DAY_TRIAL' | 'EXPIRED'; 
  createdAt: string;
  updatedAt: string;
};




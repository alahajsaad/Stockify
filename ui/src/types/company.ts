export type CompanyCreationDto = {
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



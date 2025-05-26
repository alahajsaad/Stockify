import { CompanyResponseDto } from "./company";

export type User = {
    id?: number;
    firstName: string
    lastName: string;
    email:string;
    password: string;
    telegramId?:string
   
}
export type Role = 
  | 'ADMIN'
  | 'EMPLOYEE'
  | 'TOPADMIN' ;

export type EntityStatus =
  | 'ACTIVE'
  | 'INACTIVE' ;

export type UserResponseDto = {
    id : number,
    firstName : string,
    lastName : string,
    email : string
    role : Role,
    status : EntityStatus,
    //company? : CompanyResponseDto
} 


export type CreateAdminResponse = {
    message: string;
    user: User;
  };

export type AdminInscriptionStatus =
  | 'ADMIN_HAS_COMPANY'
  | 'ACTIVE_ADMIN_WITHOUT_COMPANY'
  | 'INACTIVE_ADMIN_WITHOUT_COMPANY';

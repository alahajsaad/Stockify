export type User = {
    id?: number;
    firstName: string
    lastName: string;
    email:string;
    password: string;
    telegramId?:string
   
}

export type UserResponseDto = {
    id : number,
    firstName : string,
    lastName : string,
    email : string
} 

export type CreateAdminResponse = {
    message: string;
    user: User;
  };

export type AdminInscriptionStatus =
  | 'ADMIN_HAS_COMPANY'
  | 'ACTIVE_ADMIN_WITHOUT_COMPANY'
  | 'INACTIVE_ADMIN_WITHOUT_COMPANY';


export type User = {
    id?: number;
    firstName: string
    lastName: string;
    email:string;
    password: string;
    telegramId?:string
   
}

export type Role = |"ADMIN" |"EMPLOYEE" |"SUPER_ADMIN" ;

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

export type EmployeeCreationDto = {
    firstName:string,
    lastName:string,
    email:string
}


export type CreateAdminResponse = {
    message: string;
    user: User;
  };



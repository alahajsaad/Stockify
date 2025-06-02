

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
} 
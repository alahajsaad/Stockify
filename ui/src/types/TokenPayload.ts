export type TokenPayload = {
    tenantId: string;
    sub: string
    exp: number;
    iat:number;
    id:number ;
    fullName:string;
    companyId:number;
    scope: Role;
   
}

export type Role = 
    | "ROLE_ADMIN"
    | "ROLE_EMPLOYEE"
    | "ROLE_SUPER_ADMIN"

  
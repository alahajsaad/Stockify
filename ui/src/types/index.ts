export type { TokenPayload } from '../features/auth/types/TokenPayload'; 


export type ApiResponse<T> = {
    status : "success" | "error",
    data : T | null,
    message : string 

}
export type LoginResponse = {
    access_token: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type { CompanyCreationDto } from "./company"
export type { CompanyResponseDto } from "./company"

export type { User } from './user'
export type { CreateAdminResponse } from './user'
export type { UserResponseDto } from './user'
export type { AdminInscriptionStatus } from './user'



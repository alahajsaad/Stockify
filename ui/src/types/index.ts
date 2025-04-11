export type { TokenPayload } from '../features/auth/types/TokenPayload'; 


export type ApiResponse<T> = {
    status : "success" | "error",
    data : T | null,
    message : string 

}

export type { User } from './user'
export type { CreateAdminResponse } from './user'
export type { UserResponseDto } from './user'



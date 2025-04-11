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
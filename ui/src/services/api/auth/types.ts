export type LoginResponse = {
    access_token: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};
export type PasswordResetRequestDto = {
    email: string,
    password:string,
    confirmPassword:string,
    token:string
}

export type UpdatePasswordRequest = {
    email: string,
    actualPassword:string,
    password:string,
    confirmPassword:string,
}
export type ApiResponse<T> = {
    status : "success" | "error",
    data : T | null,
    message : string 

}
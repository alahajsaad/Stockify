export type PhoneNumber = {
    id?:number
    number:string
}
export type Client = {
    id?:number
    firstName:string
    lastName:string
    email?:string
    phoneNumbers:PhoneNumber[]
}
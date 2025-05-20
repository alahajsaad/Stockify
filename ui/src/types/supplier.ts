import { PhoneNumber } from "src/features/client"

export type Supplier = {
   id?:number
   firstName:string
   lastName: string
   email:string
   address:string
   createdAt?: Date
   updatedAt?:Date
   phoneNumbers:PhoneNumber[]
}
import { EntityType, Partner } from "../partner/types"

export type PaymentStatus = "ALL"|"PAID"|"UNPAID"
export type ReceptionStatus = "RECEIVED"| "UNRECEIVED"
export type OrderLine = {
    quantity : number,
    unitPrice : number,
    product:{
        id : number
        designation? : string
    }
}
export type SupplierOrderCreationDto = {
    orderNumber : string,
    orderLines : OrderLine[]
    partner:{
        id : number
        entityType : EntityType
    }
}

export type SupplierOrder = {
    id:number
    orderNumber : string,
    totalExcludingTax : number ,
    totalIncludingTax : number,
    paymentStatus : PaymentStatus,
    receptionStatus : ReceptionStatus,
    orderLines : OrderLine[]
    partner : Partner
}
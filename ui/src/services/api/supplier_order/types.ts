import { DynamicPartner, EntityType, Partner } from "../partner/types"
import { Product } from "../product/types"

export type PaymentStatus = "PAID"|"UNPAID"
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


export type SupplierOrderResponseDto = {
    id:number
    orderNumber:string
    totalExcludingTax:number
    totalIncludingTax:number
    paymentStatus:PaymentStatus
    receptionStatus:ReceptionStatus
    createdAt:string
    updatedAt:string
    partner:DynamicPartner
}



export type GetSupplierOrdersParams = {
    fromDate?:string
    toDate?:string
    receptionStatus?:ReceptionStatus
    paymentStatus?:PaymentStatus
    keyword?:string
    partnerId?:number
    page?:number
    size?:number
}

export type SupplierOrderFullDto = {
    id:number
    orderNumber:string
    totalExcludingTax:number
    totalIncludingTax:number
    paymentStatus:PaymentStatus
    receptionStatus:ReceptionStatus
    createdAt:string
    updatedAt:string
    supplierOrderLine : OrderLineRecord
    partner:DynamicPartner
}

export type OrderLineDto = {
    id:number
    quantity : number,
    unitPrice : number,
    product:Product
}
export type OrderLineAction = "DO_UPDATE" | "DO_SAVE" | "DO_REMOVE" | "DO_NOTHING"

export type OrderLineRecord = Record<OrderLineAction, OrderLineDto[]>
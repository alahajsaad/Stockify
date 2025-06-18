import { OrderLineRecord, PaymentStatus, ReceptionStatus } from "@/types"
import { DynamicPartner, EntityType, Partner } from "../partner/types"


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

// this used when get the supplier order by id and then to update the supplier order 
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

export type SupplierOrderStatistics = {
    totalUnpaid: number;
    totalUnreceived: number;
    totalAmountToPay: number; 
    totalAmountIncludingTaxToPay: number; 
};


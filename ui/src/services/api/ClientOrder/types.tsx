import { DeliveryStatus, OrderLineDto, OrderLineRecord, PaymentStatus } from "@/types"
import { DynamicPartner } from "../partner/types"



export type ClientOrder = {
    id:number
    orderNumber : string,
    totalExcludingTax : number ,
    totalIncludingTax : number,
    paymentStatus : PaymentStatus,
    deliveryStatus: DeliveryStatus,
    orderLines : OrderLineDto[]
    partner : DynamicPartner
}


export type GetClientOrdersParams = {
    fromDate?:string
    toDate?:string
    deliveryStatus?:DeliveryStatus
    paymentStatus?:PaymentStatus
    keyword?:string
    partnerId?:number
    page?:number
    size?:number
}

export type ClientOrderFullDto = {
    id:number
    orderNumber:string
    totalExcludingTax:number
    totalIncludingTax:number
    paymentStatus:PaymentStatus
    deliveryStatus:DeliveryStatus
    createdAt:string
    updatedAt:string
    clientOrderLine : OrderLineRecord
    partner:DynamicPartner
}


export type ClientOrderResponseDto = {
    id:number
    orderNumber:string
    totalExcludingTax:number
    totalIncludingTax:number
    paymentStatus:PaymentStatus
    deliveryStatus:DeliveryStatus
    createdAt:string
    updatedAt:string
    partner:DynamicPartner
}

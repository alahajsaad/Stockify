import { Product } from "@/services/api/product/types"

export type PaymentStatus = "PAID"|"UNPAID"
export type ReceptionStatus = "RECEIVED"| "UNRECEIVED"
export type DeliveryStatus = "DELIVERED"| "UNDELIVERED"
export type OrderLineType = "supplier_order" | "client_order"
export type OrderLineDto = {
    id:number
    quantity : number,
    unitPrice : number,
    product:Product
}
export type OrderLineAction = "DO_UPDATE" | "DO_SAVE" | "DO_REMOVE" | "DO_NOTHING"

export type OrderLineRecord = Record<OrderLineAction, OrderLineDto[]>
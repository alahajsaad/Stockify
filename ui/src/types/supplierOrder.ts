
export type PaymentMode =  | 'CHEQUE' | 'BANK_TRANSFER' | 'CASH' | 'CREDIT_CARD' ;
export type OrderLine = {
    quantity : number,
    unitPrice : number,
    product:{
        id : number
    }
}
export type SupplierOrderCreationDto = {
    orderNumber : string,
    totalExcludingTax : number ,
    totalIncludingTax : number,
    paymentMode : PaymentMode ,
    paymentDueDate : Date ,
    desiredDeliveryDate : Date ,
    orderLines : OrderLine[]
    supplier:{
        id : number
    }
}
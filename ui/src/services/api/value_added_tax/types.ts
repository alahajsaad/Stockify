

interface VatBase {
    rate : number ,
    description : string
}

export type VatCreationDto = VatBase;
export interface ValueAddedTax extends VatBase {
  id: number;
}
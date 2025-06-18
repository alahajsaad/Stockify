import { valueAddedTax } from "@/types";
import { Category } from "../category/types";
import { ValueAddedTax } from "../value_added_tax/types";

export type StockStatus = "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK"


export type ProductCreationDto = {
    designation: string;
    reference: string;
    criticalThreshold: number;
    category: Category;
    vat: valueAddedTax;
}

export type Product = {
  id: number;
  designation: string;
  reference: string;
  quantity: number;
  criticalThreshold: number;
  lastPurchasePrice: number; 
  lastSalePrice: number;     
  stockStatus: StockStatus; 
  category: Category;
  vat: ValueAddedTax;
  createdAt: string;
  updatedAt: string;  
};

export type ProductStatistics = {
    total: number;
    inStockProducts: number;
    lowStockProducts: number;
    outOfStockProducts: number;
};
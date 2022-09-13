export interface Sale {
    saleId: string,
    customerId: string,
    sellerId: string,
    locationId: string,
    status: SaleStatus,
    createdAt?: Date
    items: SaleProduct[]
}

export enum SaleStatus{
    completed = "completed",
    pending = "pending",
    cancelled = "cancelled"
  }

export interface SaleProduct {
    productId: string,
    quantity: number,
}
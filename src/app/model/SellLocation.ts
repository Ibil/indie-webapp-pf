import { ProductCategory } from "./Product";

export interface SellLocation {
    locationId: string,
    address: string,
    stock?: ProductForLocation[]
}

export interface ProductForLocation {
    productId: string;
    name: string;
    price: number;
    category: ProductCategory;
    quantity: number;
}

export interface LocationWithoutStock {
    locationId: string,
    address: string,
}
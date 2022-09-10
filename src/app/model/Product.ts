
export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  category: ProductCategory;
  tags?: string;
}

export interface EditProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  category: ProductCategory;
  tags?: string;
  stock: Stock[];
  totalStock: number;
}

export interface Stock {
  locationId: string,
  quantity: number
}

export enum ProductCategory{
  T_SHIRT = "tshirt",
  BAG = "bag",
  BOOK = "book"
}

export enum ProductStatus{
  IN_STOCK = "in stock",
  LAST_UNITS = "last units",
  SOLD_OUT = "sold out",
  NO_INFO = "no info"
}
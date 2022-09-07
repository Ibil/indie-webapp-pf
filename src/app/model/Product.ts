
export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  category: ProductCategory;
  tags?: string;
}

export enum ProductCategory{
  T_SHIRT = "tshirt",
  BAG = "bag",
  BOOK = "book"
}

export enum ProductStatus{
  TSHIRT = "in stock",
  LAST_UNITS = "last units",
  SOLD_OUT = "sold out",
  NO_INFO = "no info"
}
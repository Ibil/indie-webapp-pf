
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
  image?: string;
  description: string;
  price: number;
  status: ProductStatus;
  category?: ProductCategory;
  tags?: string;
  stock: Stock[];
  totalStock: number;
}

export interface EditProductTshirt {
  productId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  colour: string;
  size: string;
  design: string;
  status: ProductStatus;
  category: ProductCategory;
  tags?: any;
  stock: Stock[];
  totalStock: number;
}

export interface EditProductBook {
  productId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  status: ProductStatus;
  category: ProductCategory;
  tags?: string;
  stock: Stock[];
  totalStock: number;
}

export interface EditProductBag {
  productId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  colour: BagColour;
  design: string;
  status: ProductStatus;
  category: ProductCategory;
  tags?: string;
  stock: Stock[];
  totalStock: number;
}

export interface Stock {
  productId?: string,
  locationId: string,
  quantity: number
}

export interface StockWithProductID {
  productId: string,
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

export enum Size{
  kid= 'kid',
  xs = 'xs',
  s='s',
  m='m',
  l='l',
  xl='xl'
}
export enum TshirtColour{
  red='red',
  green='green',
  blue='blue',
  yellow='yellow',
  orange='orange',
  purple='purple',
  black='black',
  white='white'
}

export enum BagColour{
  red='red',
  green='green',
  blue='blue',
  yellow='yellow',
  orange='orange',
  purple='purple',
  white='white',
  black='black'
}

export interface User {
  userId: string,
  name: string,
  role: UserRole
}


export enum UserRole {
  basic = "basic",
  seller = "seller",
  manager = "manager",
  admin = "admin",
}

export interface AuthContext {
  username: string,
  role: UserRole,
  cart: ContextCart
}

export interface ContextCart {
  locationId: string,
  locationName: string,
  list: CartProduct[]
}

export interface CartProduct {
  productId: string,
  productName: string,
  price: number,
  quantity: number
}
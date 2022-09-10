
export interface User {
  userId: string,
  name: string,
  role: UserRole
}


export enum UserRole {
  basic = "basic",
  seller = "seller",
  manager = "manager",
  admin = "admin ",
}
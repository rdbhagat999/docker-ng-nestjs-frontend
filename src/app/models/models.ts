export class Permission {
  id: number;
  name: string;
}
export class Role {
  id: number;
  name: string;
}
export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role
}
export class Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}
export class orderItem {
  id: number;
  productTitle: string;
  price: string;
  quantity: number;
}
export class Order {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  total: number;
  orderItems: orderItem[]
}


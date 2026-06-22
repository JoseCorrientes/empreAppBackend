export interface IImage {
  id: string;
  url: string;
  isFrontPage: boolean;
  alt?: string;
}

export interface IMaterial {
  name: string;
  quantity: number;
  unit: "unidad" | "gramo" | "litro" | "hora";
  costPerUnit: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  sku: number;
  name: string;
  description: string;
  vSize: number;
  hSize: number;
  thicknessSize: number;
  images: IImage[];
  components: IMaterial[];
  stock: number;
  active: boolean;
  isPromotion: boolean;
  quantityPromotion: number;
  quantityDiscount: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

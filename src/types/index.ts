import { AddressType } from "./AddressSchema";

export type StateType = {
  products: ProductType[] | null;
  categories: CategoryType[] | null;
  address: AddressType[] | null;
  selectedCheckoutAddress: AddressType | null;
  pagination: PaginationType;
  isLoading: boolean;
  error: string | null;
  success: boolean;
};

export type cartState = {
  cart: cartItemType[];
  totalPrice: number;
  totalItems: number;
  cartId: number | null;
  isLoading: boolean | null;
  error: string | null;
  success: boolean;
  clientSecret?:string ;
};

export type cartItemType = {
  item: ProductType;
  quantity: number;
}


export type ActionType = {
  type: string;
  payload?: ProductType[] | CategoryType[] | null;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  lastPage?: boolean;
}

export type ProductType = {
  productId: number;
  productName: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
  discount: number;
  specialPrice: number;
};

export type cartType = {
  cartId: number;
  userId: number;
  totalPrice: number;
  products: ProductType[];
};

export type CategoryType = {
  categoryId: number;
  categoryName: string;
};

export type PaginationType = {
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  lastPage?: boolean;
};

export type AuthState = {
  user: User | null;
  address: null;
  isLoading: boolean;
  error: null;
  success: boolean;
  clientSecret?: string;
};


export type User = {
  id: number,
  jwtToken: string,
  username: string,
  roles: string[]
}

export type IPayloadResult = {
  payload: { [key: string]: any };
};

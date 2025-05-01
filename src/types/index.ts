export type StateType = {
  products: ProductType[] | null;
  categories: CategoryType[] | null;
  pagination: PaginationType;
  isLoading: boolean;
  error: string | null;
  success: boolean;
};

export type cartState = {
  cart: CartItemType[];
  totalPrice: number;
  cartId: number | null;
};





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

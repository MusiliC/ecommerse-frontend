export type StateType = {
  products: ProductType[] | CategoryType[] | null;
  categories: CategoryType[] | null;
  pagination: PaginationType;
  loading: boolean;
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

export type CategoryType = {
  cartId: number;
  userId: number;
  totalPrice: number;
  products: ProductType[];
};

export type PaginationType = {
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  lastPage?: boolean;
};

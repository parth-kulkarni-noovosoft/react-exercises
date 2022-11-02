export interface IProductInfo {
    id: number;
    title: string;
    brand: string;
    price: number;
    discountPercentage: number;
    category: string;
    description: string;
    rating: number;
    thumbnail: string;

    stock: number;
    images: string[];
}

type PaginatedResponse<T> = T & {
    total: number;
    skip: number;
    limit: number;
}

export type ProductsResponse = PaginatedResponse<{
    products: IProductInfo[];
}>

export interface ICartInfo {
    id: number;
    products: IProductInfo[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export type CartsResponse = PaginatedResponse<{
    carts: ICartInfo[]
}>

export type Nullable<T> = T | null;

export interface IPropertiesState {
    query: string;
    category: string;
    userID: number
}

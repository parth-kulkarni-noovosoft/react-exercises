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

export interface IProductsResponse {
    products: IProductInfo[];
    total: number;
    skip: number;
    limit: number;
}
export interface IProduct {
    id: number;
    name: string
    category: string
    price: number
    discountedPrice: number
    quantity: number
    description: string
}

export type ICartProduct = {
    id: number
    quantity: number
    productData: IProduct
};
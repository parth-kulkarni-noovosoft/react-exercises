export type Paginated<T> = T & {
    total: number
    skip: number
    limit: number
}

export interface IProduct {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

export interface IPost {
    id: number
    title: string
    body: string
    userId: number
    tags: string[]
    reactions: number
}
import type FormStore from "../stores/FormStore"

export type Paginated<T> = {
    [K: string]: T[]
} & {
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

export interface IRenderData<T> {
    value: T[keyof T]
    onChange: (value: T[keyof T]) => void
    disabled: boolean
    invalid: boolean
}

export interface IFieldProps<T> {
    name: keyof T
    label?: string
    index?: number
    render: (renderData: IRenderData<T>) => JSX.Element
    onChange?: (value: T[keyof T]) => void
    storeProps?: FormStore<T>
    required?: boolean
}

export interface IJsonInputProps<T> {
    name: string
    value: T[]
    entity: (renderData: IRenderData<any>) => JSX.Element
    disabled: boolean
    onChange: (data: T[]) => void
}

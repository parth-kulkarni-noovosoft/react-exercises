import type FormStore from "../stores/FormStore"
import type ListTableStore from "../stores/ListTableStore"

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

export interface IUser {
    id: number
    firstName: string
    lastName: string
    username: string
}

export interface IRenderData<T> {
    value: T[keyof T]
    onChange: (value: T[keyof T]) => void
    disabled: boolean
    invalid: boolean
    errors?: string | string[]
}

export interface IFieldProps<T> {
    name: keyof T
    label?: string
    index?: number
    render: (renderData: IRenderData<T>) => JSX.Element
    onChange?: (event: { value: T[keyof T], name: keyof T }) => void
    storeProps?: FormStore<T>
    required?: boolean
    hideError?: boolean
}

export interface IJsonInputProps<T> {
    value: T[]
    entity: (renderData: IRenderData<any>) => JSX.Element
    disabled: boolean
    onChange: (data: T[]) => void
    errors?: string[]
}

export type QueryData<T extends unknown[] | object = unknown[] | object> = Pick<
    ListTableStore<T>,
    'pageNumber' | 'pageSize' | 'searchQuery' | 'filterQuery'
>

export enum FilterTypes {
    SELECT = 'SELECT',
    NUMBER = 'RANGE',
    TEXT = 'TEXT',
    BOOLEAN = 'BOOLEAN'
}

export interface IFilterSelectOptions {
    type: FilterTypes.SELECT
    options: string[]
    displayName: string
}

export interface IFilterGenericOptions {
    type: Exclude<FilterTypes, FilterTypes.SELECT>
    displayName: string
}

export type FilterOptions = IFilterSelectOptions | IFilterGenericOptions;

export interface IFilterPickerProps {
    configuration: {
        [name: string]: FilterOptions
    }
    onChange?: (data: Record<string, string | number | boolean>) => void
    autoFetch?: boolean
}

export interface IFilter {
    name: string
    type: FilterTypes
    value: number | boolean | string
}

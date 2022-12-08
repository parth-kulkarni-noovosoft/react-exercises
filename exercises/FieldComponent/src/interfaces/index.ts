import type FormStore from "../stores/FormStore"

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
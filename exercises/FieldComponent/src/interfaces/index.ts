import type React from 'react';
import type FormStore from "../stores/FormStore"

export interface IRenderData<T> {
    value: T[keyof T]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled: boolean
    invalid: boolean
    updateValue: (value: T[keyof T]) => void
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
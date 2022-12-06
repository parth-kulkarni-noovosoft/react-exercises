import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import FormStoreContext from "../context/FormStoreContext";
import FormStore from "../stores/FormStore";

interface IFieldProps<T> {
    name: keyof T
    label?: string
    render: (value: T[keyof T], onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => JSX.Element
    onChange?: (value: T[keyof T]) => void
    storeProps?: FormStore<T>
    required?: boolean
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

function Field<T>({ storeProps, onChange, render, name, label }: IFieldProps<T>): JSX.Element {
    const store = storeProps ?? useContext<FormStore<T>>(FormStoreContext);

    const onChangeForInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value as T[keyof T];
        store.setValue(name, currentValue);
        onChange?.(currentValue);
    }

    return (
        <div>
            <label>{label ?? capitalize(name as string)}</label>
            {render(store.data[name], onChangeForInput)}
        </div>
    )
}

export default observer(Field);
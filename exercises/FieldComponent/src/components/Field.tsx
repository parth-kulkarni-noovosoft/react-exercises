import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import FormStoreContext from "../context/FormStoreContext";
import FormStore from "../stores/FormStore";

interface IRenderData<T> {
    value: T[keyof T]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isDisabled: boolean
    invalid: boolean
}

interface IFieldProps<T> {
    name: keyof T
    label?: string
    render: (renderData: IRenderData<T>) => JSX.Element
    onChange?: (value: T[keyof T]) => void
    storeProps?: FormStore<T>
    required?: boolean
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

function Field<T>({
    storeProps,
    onChange,
    render,
    name,
    label,
    required
}: IFieldProps<T>): JSX.Element {
    const store = storeProps ?? useContext(FormStoreContext);

    useEffect(() => {
        if (required) {
            store.addRequiredField(name);
        }
    }, [])

    const onChangeForInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        const currentValue = e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value

        store.setValue(name, currentValue as T[keyof T]);
        onChange?.(currentValue as T[keyof T]);
    }

    const renderData = {
        value: store.getValue(name),
        onChange: onChangeForInput,
        isDisabled: store.isDisabled,
        invalid: store.hasErrorsAt(name)
    }
    const RequiredSymbol = <span className="text-danger">*</span>

    return (
        <div>
            <label>{label ?? capitalize(name as string)}{' '}{required && RequiredSymbol}</label>
            {render(renderData)}
            {store.hasErrorsAt(name)
                ? <small className="text-danger">{store.getError(name)}</small>
                : null
            }
        </div>
    )
}

export default observer(Field);
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import Label from "./Label";
import FormStoreContext from "../context/FormStoreContext";
import FormStore from "../stores/FormStore";

interface IRenderData<T> {
    value: T[keyof T]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled: boolean
    invalid: boolean
}

interface IFieldProps<T> {
    name: keyof T
    label?: string
    index?: number
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
    required,
    index
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

        if (Array.isArray(store.getValue(name)) && Number.isInteger(index)) {
            store.setValueInArray(name, index!, currentValue as T[keyof T]);
        } else {
            store.setValue(name, currentValue as T[keyof T]);
        }
        onChange?.(currentValue as T[keyof T]);
    }

    const renderData: IRenderData<T> = {
        value: Number.isInteger(index) ? store.getValue(name)[index!] : store.getValue(name),
        onChange: onChangeForInput,
        disabled: store.isDisabled,
        invalid: store.hasErrorsAt(name)
    }

    return (
        <div>
            {label && <Label label={label} required={required} />}
            {render(renderData)}
            {store.hasErrorsAt(name)
                ? <div><small className="text-danger">{store.getError(name)}</small></div>
                : null
            }
        </div>
    )
}

export default observer(Field);
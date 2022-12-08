import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import FormStoreContext from "../context/FormStoreContext";
import { IFieldProps, IRenderData } from "../interfaces";

function Field<T>(props: IFieldProps<T>): JSX.Element {
    const { storeProps, onChange, render, name, label, required, index } = props;

    const store = storeProps ?? useContext(FormStoreContext);

    useEffect(() => {
        if (required) store.addRequiredField(name);
    }, [])

    const onChangeForInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        store.removeErrorAt(name, index);

        const currentValue = (
            e.target.type === 'checkbox'
                ? e.target.checked
                : e.target.value
        ) as T[keyof T]

        store.setValue(name, currentValue, index);
        onChange?.(currentValue);
    }

    const renderData: IRenderData<T> = {
        value: store.getValue(name, index),
        onChange: onChangeForInput,
        disabled: store.isDisabled,
        invalid: store.hasErrorsAt(name, index),
        updateValue: (data: T[keyof T]) => {
            store.removeErrorAt(name);
            store.setValue(name, data, index)
        }
    }

    const RequiredSymbol = required
        ? <span className="text-danger">*</span>
        : null;

    const Label = label && <label>{label}{RequiredSymbol}</label>

    return (
        <div>
            {Label}
            {render(renderData)}
            {renderData.invalid
                ? <div><small className="text-danger">{store.getError(name, index)}</small></div>
                : null
            }
        </div>
    )
}

export default observer(Field);
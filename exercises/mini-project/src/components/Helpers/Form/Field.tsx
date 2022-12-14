import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import FormStoreContext from "../../../context/FormStoreContext";
import { IFieldProps, IRenderData } from "../../../interfaces";

function Field<T>(props: IFieldProps<T>): JSX.Element {
    const {
        storeProps,
        onChange,
        render,
        name,
        label,
        required,
        index,
        hideError
    } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const store = storeProps ?? useContext(FormStoreContext);

    useEffect(() => {
        if (required) store.addRequiredField(name);
    }, [])

    const renderData: IRenderData<T> = {
        value: store.getValue(name),
        onChange: (data) => {
            store.removeErrorAt(name, index);
            store.setValue(name, data);
            onChange?.({ name, value: data });
        },
        disabled: store.isDisabled,
        invalid: store.hasErrorsAt(name, index),
        errors: store.getError(name)
    }

    const RequiredSymbol = required
        ? <span className="text-danger">*</span>
        : null;

    const Label = label && <label>{label}{RequiredSymbol}</label>

    const Error = renderData.invalid
        ? <div><small className="text-danger">{store.getError(name, index)}</small></div>
        : null

    return (
        <div>
            {Label}
            {render(renderData)}
            {!hideError && Error}
        </div>
    )
}

export default observer(Field);
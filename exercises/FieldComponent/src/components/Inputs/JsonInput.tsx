import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button } from "reactstrap";
import FormStore from "../../stores/FormStore";
import Label from "../Label";

interface IJsonInputProps<T> {
    store: FormStore<T>
    name: keyof T
    label: string
    entity: (index: number, deleteCurrent: () => void) => JSX.Element
    required?: boolean
}

const JsonInput = <T,>({ entity, name, store, label, required }: IJsonInputProps<T>) => {

    useEffect(() => {
        if (required) {
            store.addRequiredField(name);
        }
    }, [])

    return (
        <div>
            <Label label={label} required={required} />
            {(store.getValue(name) as T[typeof name][])
                .map((_, index) => (
                    <React.Fragment key={name.toString() + index.toString()}>
                        {entity(index, () => store.removeValueInArray(name, index))}
                    </React.Fragment>
                ))
            }
            <br />
            <Button
                type="button"
                color="primary"
                onClick={() => {
                    store.addValueInArray(name, '' as T[keyof T]);
                }}
            >Add</Button>
        </div>
    );
}

export default observer(JsonInput);
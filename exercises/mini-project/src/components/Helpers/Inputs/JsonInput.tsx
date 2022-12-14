import { observer } from "mobx-react-lite";
import React from "react";
import { Trash } from "react-bootstrap-icons";
import { Button } from "reactstrap";
import { IJsonInputProps } from "../../../interfaces";

const getInitialValue = <T,>(arr: T[]): T => {
    switch (typeof arr[0]) {
        case 'string': return '' as T
        case 'number': return 0 as T
        case 'boolean': return false as T
        default: return undefined as T
    }
}

const JsonInput = <T,>(props: IJsonInputProps<T>) => {
    const { entity, value: itemsArray, disabled, onChange, errors } = props;
    if (!Array.isArray(itemsArray)) throw Error('value is not array');

    return <div>
        {itemsArray.map((_, index) => (
            <React.Fragment key={index}>
                {entity({
                    disabled,
                    invalid: !!errors?.[index],
                    value: itemsArray[index],
                    onChange: (value) => {
                        onChange(itemsArray.map(
                            (data, i) => (i === index ? value : data) as T
                        ))
                    },
                    errors: errors?.[index] ?? undefined
                })}
                <Button
                    type="button"
                    onClick={() => onChange(itemsArray.filter((_, idx) => idx !== index))}
                    disabled={disabled || itemsArray.length === 1}
                >
                    <Trash />
                </Button>
                {!!errors?.[index] && (
                    <div>
                        <small className="text-danger">{errors[index]}</small>
                    </div>
                )}
            </React.Fragment>
        ))}
        <br />
        <Button
            type="button"
            color="primary"
            disabled={disabled}
            onClick={() => onChange([...itemsArray, getInitialValue(itemsArray)])}
        >Add</Button>
    </div>
}

export default observer(JsonInput);
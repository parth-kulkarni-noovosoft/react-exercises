import { observer } from "mobx-react-lite";
import { Trash } from "react-bootstrap-icons";
import { Button } from "reactstrap";
import { IJsonInputProps } from "../../../interfaces";
import Field from "../Form/Field";

const getInitialValue = <T,>(arr: T[]): T => {
    switch (typeof arr[0]) {
        case 'string': return '' as T
        case 'number': return 0 as T
        case 'boolean': return false as T
        default: return undefined as T
    }
}

const JsonInput = <T,>(props: IJsonInputProps<T>) => {
    const { entity, name, value: itemsArray, disabled, onChange } = props;
    if (!Array.isArray(itemsArray)) throw Error('value is not array');

    return <div>
        {itemsArray.map((_, index) => (
            <Field
                key={index}
                name={name}
                index={index}
                render={(renderData) => (<>
                    {entity({
                        ...renderData,
                        value: itemsArray[index],
                        onChange: (value) => {
                            onChange(itemsArray.map(
                                (data, i) => (i === index ? value : data) as T
                            ))
                        },
                    })}
                    <Button
                        type="button"
                        onClick={() => onChange(itemsArray.filter((_, idx) => idx !== index))}
                        disabled={disabled || itemsArray.length === 1}
                    >
                        <Trash />
                    </Button>
                </>)}
            />
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
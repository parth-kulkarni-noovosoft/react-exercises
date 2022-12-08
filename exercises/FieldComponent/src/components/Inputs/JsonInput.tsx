import { observer } from "mobx-react-lite";
import { Trash } from "react-bootstrap-icons";
import { Button } from "reactstrap";
import { IRenderData } from "../../interfaces";
import Field from "../Field";

interface IJsonInputProps<T> {
    name: string
    value: T[]
    entity: (renderData: IRenderData<any>) => JSX.Element
    disabled: boolean
    onChange: (data: T[]) => void
}

const getInitialValue = <T,>(arr: T[]): T => {
    switch (typeof arr[0]) {
        case 'string': return '' as T
        case 'number': return 0 as T
        case 'boolean': return false as T
        default: return undefined as T
    }
}

const JsonInput = <T,>(props: IJsonInputProps<T>) => {
    const { entity, name, value, disabled, onChange } = props;
    return <div>
        {value.map((_, index) => (
            <Field
                key={index}
                name={name}
                index={index}
                render={renderData => (<>
                    {entity(renderData)}
                    <Button
                        type="button"
                        onClick={() => onChange(value.filter((_, idx) => idx !== index))}
                        disabled={disabled || value.length === 1}
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
            onClick={() => onChange([...value, getInitialValue(value)])}
        >Add</Button>
    </div>
}

export default observer(JsonInput);
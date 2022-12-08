import { observer } from "mobx-react-lite";
import { Button } from "reactstrap";
import { IRenderData } from "../../interfaces";
import Field from "../Field";

interface IJsonInputProps<T> {
    name: string
    value: T[]
    entity: (renderData: IRenderData<any> & {
        index: number
        totalItems: number
    }) => JSX.Element
    disabled: boolean
    onAdd: () => void
}

const JsonInput = <T,>(props: IJsonInputProps<T>) => {
    const { entity, name, value, disabled, onAdd } = props;
    return <div>
        {value.map((_, index) => (
            <Field
                key={index}
                name={name}
                index={index}
                render={(renderData) => entity({
                    index,
                    totalItems: value.length,
                    ...renderData
                })}
            />
        ))}
        <br />
        <Button
            type="button"
            color="primary"
            disabled={disabled}
            onClick={onAdd}
        >Add</Button>
    </div>
}

export default observer(JsonInput);
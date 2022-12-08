import { makeAutoObservable, toJS } from "mobx";
import Field from "../components/Field";
import Form from "../components/Form";
import JsonInput from "../components/Inputs/JsonInput";
import FormStore from "../stores/FormStore";
import { Button, Input } from 'reactstrap';
import { Trash } from 'react-bootstrap-icons';

class MultiInputFormData {
    continent = '';
    name = '';
    hobbies: string[] = [''];
    items: string[] = [''];

    constructor() {
        makeAutoObservable(this);
    }
}

const formStore = new FormStore(new MultiInputFormData());

const MultiInputForm = () => {
    return (
        <Form
            store={formStore}
            onSubmit={(data) => console.log(data)}
        >
            <Field
                name='continent'
                label="Continent"
                required
                render={({ disabled, invalid, onChange, value }) => (
                    <Input
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        invalid={invalid}
                    />
                )}
            />
            <Field
                name='name'
                label="Name"
                required
                render={({ disabled, invalid, onChange, value }) => (
                    <Input
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        invalid={invalid}
                    />
                )}
            />

            <Field
                name='hobbies'
                label='Hobbies'
                render={({ value, disabled, updateValue }) => (
                    <JsonInput
                        value={value}
                        name='hobbies'
                        disabled={disabled}
                        onAdd={() => updateValue([...value, ''])}
                        entity={({ disabled, invalid, onChange, value: elementValue, totalItems, index, updateValue: updateElementValue }) => (<>
                            <Input
                                disabled={disabled}
                                invalid={invalid}
                                onChange={onChange}
                                value={elementValue as string | number}
                                style={{ width: '80%', display: 'inline' }}
                            />
                            <Button
                                type="button"
                                onClick={() => {
                                    updateElementValue(elementValue)
                                    updateValue((value as string[]).filter((_, idx) => idx !== index))
                                }}
                                disabled={disabled || totalItems === 1}
                            >
                                <Trash />
                            </Button>
                        </>)}
                    />)
                }
            />

            <Field
                name='items'
                label='Items'
                required
                render={({ value, disabled, updateValue }) => (
                    <JsonInput
                        value={value}
                        name='items'
                        disabled={disabled}
                        onAdd={() => updateValue([...value, ''])}
                        entity={({ disabled, index, invalid, onChange, value: elementValue, totalItems, updateValue: updateElementValue }) => (<>
                            <Input
                                disabled={disabled}
                                invalid={invalid}
                                onChange={onChange}
                                value={elementValue as string | number}
                                style={{ width: '80%', display: 'inline' }}
                            />
                            <Button
                                type="button"
                                onClick={() => {
                                    updateElementValue(elementValue)
                                    updateValue((value as string[]).filter((_, idx) => idx !== index))
                                }}
                                disabled={disabled || totalItems === 1}
                            >
                                <Trash />
                            </Button>
                        </>)}
                    />)
                }
            />

        </Form>
    )
}

export default MultiInputForm;
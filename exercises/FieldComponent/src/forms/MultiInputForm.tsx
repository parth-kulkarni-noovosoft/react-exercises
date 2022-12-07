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
                render={({ value, disabled, onAdd }) => (
                    <JsonInput
                        value={value}
                        name='hobbies'
                        disabled={disabled}
                        onAdd={onAdd}
                        entity={({ disabled, index, invalid, onChange, onDelete, value }) => (<>
                            <Input
                                disabled={disabled}
                                invalid={invalid}
                                onChange={onChange}
                                value={value as string | number}
                                style={{ width: '80%', display: 'inline' }}
                            />
                            <Button
                                type="button"
                                onClick={() => onDelete()}
                                disabled={disabled || index === 0}
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
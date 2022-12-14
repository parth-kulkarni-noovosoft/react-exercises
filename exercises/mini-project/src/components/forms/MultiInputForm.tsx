import { makeAutoObservable } from "mobx";
import Field from "../Helpers/Form/Field";
import Form from "../Helpers/Form/Form";
import JsonInput from "../Helpers/Inputs/JsonInput";
import FormStore from "../../stores/FormStore";
import { Container, Input } from 'reactstrap';

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
        <Container>
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
                            onChange={(e) => onChange(e.target.value)}
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
                            onChange={(e) => onChange(e.target.value)}
                            disabled={disabled}
                            invalid={invalid}
                        />
                    )}
                />

                <Field
                    name='hobbies'
                    label='Hobbies'
                    render={({ value, disabled, onChange }) => (
                        <JsonInput
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            entity={({ disabled, invalid, onChange, value }) => (
                                <Input
                                    disabled={disabled}
                                    invalid={invalid}
                                    onChange={(e) => onChange(e.target.value)}
                                    value={value as string | number}
                                    style={{ width: '80%', display: 'inline' }}
                                />
                            )}
                        />)
                    }
                />

                <Field
                    name='items'
                    label='Items'
                    required
                    hideError
                    render={({ value, disabled, onChange, errors }) => (
                        <JsonInput
                            value={value}
                            disabled={disabled}
                            onChange={onChange}
                            errors={errors as string[]}
                            entity={({ disabled, invalid, onChange, value }) => (
                                <Input
                                    disabled={disabled}
                                    invalid={invalid}
                                    onChange={(e) => onChange(e.target.value)}
                                    value={value}
                                    style={{ width: '80%', display: 'inline' }}
                                />
                            )}
                        />)
                    }
                />
            </Form>
        </Container>
    )
}

export default MultiInputForm;
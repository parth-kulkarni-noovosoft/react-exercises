import { Input } from "reactstrap";
import Field from "../components/Field";
import Form from "../components/Form";
import Select from "../components/Inputs/Select";
import FormStore from "../stores/FormStore";

const randomFormData = {
    textInput: '',
    requiredTextInput: '',
    checkInput: false,
    radioInput: 'A',
    selectInput: 'A',
    otherSelectInput: 'A'
};

const formStore = new FormStore(randomFormData);

const RandomForm = () => {
    return (
        <Form
            store={formStore}
            onSubmit={(data) => console.log(data)}
        >
            <Field
                name='textInput'
                label='Text Input'
                render={({ invalid, disabled: isDisabled, onChange, value }) => (
                    <Input
                        value={value}
                        disabled={isDisabled}
                        onChange={onChange}
                        invalid={invalid}
                    />
                )}
            />
            <Field
                name='requiredTextInput'
                label='Required Text Input'
                required
                render={({ invalid, disabled: isDisabled, onChange, value }) => (
                    <Input
                        value={value}
                        disabled={isDisabled}
                        onChange={onChange}
                        invalid={invalid}
                    />
                )}
            />
            <Field
                name='checkInput'
                label="is checked?"
                render={({ value, onChange, disabled: isDisabled }) => (
                    <Input
                        disabled={isDisabled}
                        type="checkbox"
                        checked={value}
                        onChange={onChange}
                    />
                )}
            />
            <Field
                name='radioInput'
                label="A"
                render={({ value, onChange, disabled: isDisabled }) => (
                    <Input
                        disabled={isDisabled}
                        type="radio"
                        value="A"
                        checked={value === 'A'}
                        onChange={onChange}
                    />
                )}
            />
            <Field
                name='radioInput'
                label="B"
                render={({ value, onChange, disabled: isDisabled }) => (
                    <Input
                        disabled={isDisabled}
                        type="radio"
                        value="B"
                        checked={value === 'B'}
                        onChange={onChange}
                    />
                )}
            />
            <Field
                name='radioInput'
                label="C"
                render={({ value, onChange, disabled: isDisabled }) => (
                    <Input
                        disabled={isDisabled}
                        type="radio"
                        value="C"
                        checked={value === 'C'}
                        onChange={onChange}
                    />
                )}
            />
            <Field
                name='selectInput'
                label="Select Input"
                render={({ value, onChange, disabled: isDisabled, invalid }) => (
                    <Select
                        value={value}
                        onChange={onChange}
                        isDisabled={isDisabled}
                        invalid={invalid}
                        options={['A', 'B', 'C']}
                    />
                )}
            />
            <Field
                name='otherSelectInput'
                label="Other Select Input"
                render={({ value, onChange, disabled: isDisabled, invalid }) => (
                    <Select
                        value={value}
                        onChange={onChange}
                        isDisabled={isDisabled}
                        invalid={invalid}
                        options={[
                            { name: 'this is A', value: 'A' },
                            { name: 'this is B', value: 'B' },
                            { name: 'this is C', value: 'C' },
                        ]}
                    />
                )}
            />
        </Form>
    )
}

export default RandomForm;
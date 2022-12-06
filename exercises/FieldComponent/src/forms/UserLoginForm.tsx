import Field from "../components/Field";
import Form from "../components/Form";
import FormStore from "../stores/FormStore";
import { Input } from 'reactstrap';

const userDetailsData = {
    email: '',
    password: ''
}

const formStore = new FormStore(userDetailsData);

const UserLoginForm = () => {
    return (
        <Form
            store={formStore}
            submitButtonText='Submit'
            onSubmit={data => console.log(data)}
        >
            <Field
                name='email'
                required
                render={({value, onChange}) => (
                    <Input
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <Field
                name='password'
                required
                render={({value, onChange}) => (
                    <Input
                        type='password'
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
        </Form>
    )
}

export default UserLoginForm;
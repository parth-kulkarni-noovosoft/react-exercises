import Field from "../components/Field";
import Form from "../components/Form";
import FormStore from "../stores/FormStore";
import { Input } from 'reactstrap';


const userDetailsData = {
    firstName: '',
    middleName: '',
    lastName: ''
}

const formStore = new FormStore(userDetailsData);

const UserDetailForm = () => {
    return (
        <Form
            store={formStore}
            submitButtonText='Submit'
            onSubmit={data => console.log(data)}
        >
            <Field
                name='firstName'
                label='First Name'
                render={(value, onChange) => (
                    <Input
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <Field
                name='middleName'
                label='Middle Name'
                render={(value, onChange) => (
                    <Input
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <Field
                name='lastName'
                label='Last Name'
                render={(value, onChange) => (
                    <Input
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
        </Form>
    )
}

export default UserDetailForm;
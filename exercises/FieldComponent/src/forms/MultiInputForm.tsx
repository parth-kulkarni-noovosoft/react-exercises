import { makeAutoObservable } from "mobx";
import Field from "../components/Field";
import Form from "../components/Form";
import JsonInput from "../components/Inputs/JsonInput";
import FormStore from "../stores/FormStore";
import { Button, Input } from 'reactstrap';
import { Trash } from 'react-bootstrap-icons';

class MultiInputFormData {
    continent = '';
    name = '';
    hobbies: string[] = [];

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
                render={(renderData) => (
                    <Input
                        {...renderData}
                    />
                )}
            />
            <Field
                name='name'
                label="Name"
                render={(renderData) => (
                    <Input
                        {...renderData}
                    />
                )}
            />

            <JsonInput
                name='hobbies'
                label='Hobbies'
                required
                store={formStore}
                entity={(index, deleteCurrent) => (
                    <Field
                        name='hobbies'
                        index={index}
                        render={(renderData) => (
                            <>
                                <Input
                                    {...renderData}
                                    style={{ width: '80%', display: 'inline' }}
                                />
                                <Button
                                    type="button"
                                    onClick={() => deleteCurrent()}
                                    disabled={renderData.disabled}
                                >
                                    <Trash />
                                </Button>
                            </>
                        )}
                    />
                )}
            />
        </Form>
    )
}

export default MultiInputForm;
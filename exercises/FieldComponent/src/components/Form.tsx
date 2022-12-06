import { observer } from "mobx-react-lite";
import FormStoreContext from "../context/FormStoreContext";
import FormStore from "../stores/FormStore";
import { Button } from 'reactstrap';
import { toJS } from "mobx";

interface IFormProps<T> {
    children: JSX.Element | JSX.Element[]
    store: FormStore<T>
    showSubmit?: boolean
    submitBtnName?: string

    onSubmit: (data: T) => void
}

function Form<T>({
    showSubmit = true,
    submitBtnName = 'Save',
    children,
    store,
    onSubmit
}: IFormProps<T>): JSX.Element {

    return (
        <FormStoreContext.Provider value={store}>
            <form>
                {children}
                {showSubmit && (
                    <Button
                        type="submit"
                        onClick={e => {
                            e.preventDefault();
                            onSubmit(toJS(store.data))
                        }}
                    >
                        {submitBtnName}
                    </Button>
                )}
            </form>
        </FormStoreContext.Provider>
    )
}

export default observer(Form);
import { observer } from "mobx-react-lite";
import FormStoreContext from "../../context/FormStoreContext";
import FormStore from "../../stores/FormStore";
import { Button } from 'reactstrap';
import { toJS } from "mobx";

interface IFormProps<T> {
    children: JSX.Element | JSX.Element[]
    store: FormStore<T>
    showSubmit?: boolean
    submitButtonText?: string

    onSubmit?: (data: T) => void
}

function Form<T>({
    showSubmit = true,
    submitButtonText = 'Save',
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
                        disabled={store.isDisabled}
                        onClick={e => {
                            e.preventDefault();

                            const wasSubmitted = store.onSubmit();
                            if (!wasSubmitted) return;

                            store.setIsDisabled(true);
                            onSubmit?.(toJS(store.data))
                        }}
                    >
                        {submitButtonText}
                    </Button>
                )}
            </form>
        </FormStoreContext.Provider>
    )
}

export default observer(Form);
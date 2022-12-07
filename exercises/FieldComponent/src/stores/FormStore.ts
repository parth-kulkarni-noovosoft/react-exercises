import { action, makeObservable, observable } from "mobx";

class FormStore<T> {
    @observable data: T;
    @observable errorFields: Partial<Record<keyof T, string>> = {};
    @observable requiredFields: Set<keyof T> = new Set();
    @observable isDisabled = false
    initialValues: T;

    constructor(data: T) {
        makeObservable(this);
        this.data = data;
        this.initialValues = data;
    }

    getValue = (key: keyof T) => this.data[key];

    @action setIsDisabled = (isDisabled: boolean) => this.isDisabled = isDisabled;

    @action setValue = (key: keyof T, value: T[keyof T]) => this.data[key] = value;

    @action setValueInArray = (key: keyof T, index: number, value: T[keyof T]) => (this.data[key] as T[keyof T][])[index] = value;

    @action addValueInArray = (key: keyof T, value: T[keyof T]) => (this.data[key] as T[keyof T][]).push(value);

    @action removeValueInArray = (key: keyof T, index: number) => (this.data[key] as T[keyof T][]).splice(index, 1);

    @action resetValues = () => this.data = this.initialValues;

    @action addErrorAt = (key: keyof T, error: string) => this.errorFields[key] = error;

    @action removeErrorAt = (key: keyof T) => delete this.errorFields[key];

    @action resetErrors = () => this.errorFields = {};

    hasErrorsAt = (key: keyof T) => !!this.errorFields[key]

    hasError = () => Object.keys(this.errorFields).length !== 0

    getError = (key: keyof T) => this.errorFields[key];

    @action addRequiredField = (key: keyof T) => this.requiredFields.add(key);

    onSubmit() {
        this.resetErrors();

        for (const requiredKey of this.requiredFields.values()) {
            const currentValue = this.getValue(requiredKey);

            if (Array.isArray(currentValue)) {
                if (currentValue.length === 0) {
                    this.addErrorAt(requiredKey, 'Add at least 1 value');
                }
                if (currentValue.some(data => data === '')) {
                    this.addErrorAt(requiredKey, 'Fields should be non empty');
                }
            } else if (this.getValue(requiredKey) === '') {
                this.addErrorAt(requiredKey, 'Field cannot be empty');
            }
        }
            
        if (this.hasError()) {
            return false;
        }

        return true;
    }
}

export default FormStore;
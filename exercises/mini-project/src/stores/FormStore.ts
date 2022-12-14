import { action, makeObservable, observable } from "mobx";

class FormStore<T> {
    @observable data: T;
    @observable errorFields: Partial<Record<keyof T | string, string | string[]>> = {};
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

    @action resetValues = () => this.data = this.initialValues;

    @action addErrorAt = (key: keyof T, error: string, index?: number) => {
        if (index !== undefined) {
            if (!this.errorFields[key]) {
                this.errorFields[key] = [];
            }
            (this.errorFields[key] as string[])[index] = error;
            return;
        }
        this.errorFields[key] = error;
    }

    @action removeErrorAt = (key: keyof T, index?: number) => {
        if (index !== undefined) {
            return delete (this.errorFields[key] as string[])[index];
        }

        delete this.errorFields[key];
    }

    @action resetErrors = () => this.errorFields = {};

    getError = (key: keyof T, index?: number) => index !== undefined
        ? (this.errorFields[key] as string[])[index]
        : (this.errorFields[key])


    hasErrorsAt = (key: keyof T, index?: number) => !!this.getError(key, index);

    hasError = () => Object.keys(this.errorFields).length !== 0


    @action addRequiredField = (key: keyof T) => this.requiredFields.add(key);

    onSubmit() {
        this.resetErrors();

        for (const requiredKey of this.requiredFields.values()) {
            const currentValue = this.getValue(requiredKey);
            if (Array.isArray(currentValue)) {
                currentValue.forEach((value, index) => {
                    if (value === '') {
                        this.addErrorAt(requiredKey, 'Field cannot be empty', index);
                    }
                })

            } else if (this.getValue(requiredKey) === '') {
                this.addErrorAt(requiredKey, 'Field cannot be empty');
            }
        }

        return !this.hasError();
    }
}

export default FormStore;
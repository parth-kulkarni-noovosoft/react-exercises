import { action, makeObservable, observable } from "mobx";

class FormStore<T> {
    @observable data: T;
    @observable errorFields: Partial<Record<keyof T | string, string>> = {};
    @observable requiredFields: Set<keyof T> = new Set();
    @observable isDisabled = false
    initialValues: T;

    constructor(data: T) {
        makeObservable(this);
        this.data = data;
        this.initialValues = data;
    }

    getKey = (key: keyof T, index?: number): keyof typeof this.errorFields => {
        return `${String(key)}${index === undefined ? '' : `.${index}`}`
    }

    getValue = (key: keyof T, index?: number) => {
        if (index !== undefined) {
            return (this.data[key] as T[typeof key][])[index]
        }

        return this.data[key];
    }

    @action setIsDisabled = (isDisabled: boolean) => this.isDisabled = isDisabled;

    @action setValue = (key: keyof T, value: T[keyof T], index?: number) => {
        if (index !== undefined) {
            (this.data[key] as T[typeof key][])[index] = value;
            return;
        }

        this.data[key] = value
    };

    @action resetValues = () => this.data = this.initialValues;

    @action addErrorAt = (key: keyof T, error: string, index?: number) => this.errorFields[this.getKey(key, index)] = error;

    @action removeErrorAt = (key: keyof T, index?: number) => delete this.errorFields[this.getKey(key, index)];

    @action resetErrors = () => this.errorFields = {};

    hasErrorsAt = (key: keyof T, index?: number) => !!this.errorFields[this.getKey(key, index)]

    hasError = () => Object.keys(this.errorFields).length !== 0

    getError = (key: keyof T, index?: number) => this.errorFields[this.getKey(key, index)];

    @action addRequiredField = (key: keyof T) => this.requiredFields.add(key);

    onSubmit() {
        this.resetErrors();

        for (const requiredKey of this.requiredFields.values()) {
            const currentValue = this.getValue(requiredKey);

            if (Array.isArray(currentValue)) {
                if (currentValue.length === 0) {
                    this.addErrorAt(requiredKey, 'Add at least 1 value');
                    continue;
                }

                currentValue.forEach((value, index) => {
                    if (value === '') {
                        this.addErrorAt(requiredKey, 'Field cannot be empty', index);
                    }
                })

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
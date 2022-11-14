import { action, makeObservable, observable } from "mobx";

type FormStoreState = Record<string, string | number | boolean>;

export default class FormStore {
    @observable state: FormStoreState = {};

    constructor() {
        makeObservable(this);
    }

    @action addInitialValues(initialValues: FormStoreState) {
        this.state = {
            ...this.state,
            ...initialValues
        }
    }

    @action updateSpecificValue(key: string, val: FormStoreState[string]) {
        this.state[key] = val;
    }

    @action resetValue(key: string) {
        switch(typeof this.state[key]) {
            case 'boolean':
                return this.state[key] = false;
            case 'number':
                return this.state[key] = 0;
            case 'string':
                return this.state[key] = '';
        }
    }
}
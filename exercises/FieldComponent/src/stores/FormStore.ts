import { action, makeObservable, observable } from "mobx";

class FormStore<T> {
    @observable data: T;

    constructor(data: T) {
        makeObservable(this);
        this.data = data;
    }

    @action setValue<K extends keyof T>(key: K, value: T[K]) {
        this.data[key] = value as T[K];
    }
}

export default FormStore;
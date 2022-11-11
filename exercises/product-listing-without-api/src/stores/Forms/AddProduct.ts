import { action, observable, makeAutoObservable } from "mobx";
import { IProduct } from "../../interfaces";

export default class AddProductStore {
    @observable state: Omit<IProduct, 'id'> = {
        category: '',
        description: '',
        discountedPrice: 0,
        name: '',
        price: 0,
        quantity: 0
    }

    constructor() {
        makeAutoObservable(this);
    }

    @action updateSpecificValue<T extends keyof typeof this.state>(key: T, val: typeof this.state[T]) {
        this.state = {
            ...this.state,
            [key]: val
        }
    }

    @action resetAllValues() {
        this.state = {
            category: '',
            description: '',
            discountedPrice: 0,
            name: '',
            price: 0,
            quantity: 0
        }
    }
}
import RootStore from "./RootStore";
import { action, autorun, computed, makeAutoObservable, observable } from "mobx";
import { IProduct } from "../interfaces";

class ProductStore {
    @observable products: IProduct[] = [];

    constructor(
        public rootStore: RootStore,
    ) {
        makeAutoObservable(this);
    }

    @computed get count() {
        return this.products.length;
    }

    @computed get nextID() {
        return this.count + 1;
    }

    @action addProduct(product: IProduct | Omit<IProduct, 'id'>): void {
        this.products.push({
            id: this.nextID,
            ...product
        });
    }
}

export default ProductStore;
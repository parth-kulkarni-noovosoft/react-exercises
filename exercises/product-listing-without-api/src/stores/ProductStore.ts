import { action, makeAutoObservable, observable } from "mobx";
import { IProduct } from "../interfaces";

class ProductStore {
    @observable products: IProduct[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action addProduct(product: IProduct | Omit<IProduct, 'id'>) {
        this.products.push({
            id: this.products.length + 1,
            ...product
        });
    }
}

export default ProductStore;
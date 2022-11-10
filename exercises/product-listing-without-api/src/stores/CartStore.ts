import { computed, action, observable, makeAutoObservable } from "mobx";
import { IProduct } from "../interfaces";
import RootStore from "./RootStore";

type ICartProduct = Pick<IProduct, 'id' | 'quantity'>;

export default class CartStore {
    @observable products: ICartProduct[] = [];

    constructor(
        public rootStore: RootStore
    ) {
        makeAutoObservable(this);
    }

    @computed getProductQuantity(id: ICartProduct['id']): number {
        const product = this.products.find((product) => product.id === id);
        if (!product) return 0;
        return product.quantity;
    }

    @action changeProductQuantity(id: ICartProduct['id'], amount: number) {
        const product = this.products.find((product) => product.id === id);
        if (!product) return;

        product.quantity += amount;
    }

    @action incrementProductQuantity(id: ICartProduct['id']) {
        this.changeProductQuantity(id, 1);
    }

    @action decrementProductQuantity(id: ICartProduct['id']) {
        this.changeProductQuantity(id, -1);
    }

    @action addProduct(productToAdd: ICartProduct) {
        const productExists = this.rootStore.productStore.products.find(product => product.id === productToAdd.id);
        if (!productExists) return null;
        this.products.push(productToAdd);
    }
}
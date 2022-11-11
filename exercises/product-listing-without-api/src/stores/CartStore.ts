import { action, observable, makeAutoObservable } from "mobx";
import { ICartProduct } from "../interfaces";
import RootStore from "./RootStore";

export default class CartStore {
    @observable products: ICartProduct[] = [];

    constructor(
        public rootStore: RootStore
    ) {
        makeAutoObservable(this, {
            getProductQuantity: false
        });
    }

    getProductQuantity(id: ICartProduct['id']): number {
        const product = this.products.find((product) => product.id === id);
        if (!product) return 0;
        return product.quantity;
    }

    @action changeProductQuantity(id: ICartProduct['id'], amount: number) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            product.quantity += amount;
            if (product.quantity === 0) {
                this.removeProduct(id);
            }
            return;
        }

        this.addProduct({
            id,
            quantity: amount
        })
    }

    @action addProduct(productToAdd: Pick<ICartProduct, 'id' | 'quantity'>) {
        const productExists = this.rootStore.productStore.products.find(product => product.id === productToAdd.id);
        if (!productExists) return null;
        this.products.push({
            ...productToAdd,
            productData: productExists
        });
    }

    @action removeProduct(id: ICartProduct['id']) {
        const productIdx = this.products.findIndex(product => product.id === id);
        if (productIdx === -1) return;
        this.products.splice(productIdx, 1);
    }
}
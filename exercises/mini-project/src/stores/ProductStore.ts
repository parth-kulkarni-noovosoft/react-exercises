import { makeObservable, observable } from "mobx"
import { IProduct, Paginated } from "../interfaces";
import Networking from "../networking"
import ListTableStore from "./ListTableStore"
import RootStore from "./RootStore"


class ProductStore {
    @observable product: IProduct | null = null;
    public productsListingStore: ListTableStore<IProduct>;

    constructor(
        public rootStore: RootStore
    ) {
        makeObservable(this);
        this.productsListingStore = new ListTableStore('products', this.getProducts);
    }

    getProducts = (pageNumber: number, searchQuery: string) => {
        const pageSize = this.productsListingStore?.pageSize ?? 10;

        const queryParams = `limit=${pageSize}&skip=${(pageNumber - 1) * pageSize}`;
        const url = searchQuery === ''
            ? `products?${queryParams}`
            : `products/search?q=${searchQuery}&${queryParams}`

        return Networking.getData<Paginated<IProduct>>(url);
    }
}

export default ProductStore;
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
        this.productsListingStore = new ListTableStore(this.getProducts);
    }

    getProducts = async (pageNumber: number) => {
        const pageSize = 10;
        const url = `products?limit=${pageSize}&skip=${(pageNumber - 1) * pageSize}`
        const data = await Networking.getData<Paginated<{ products: IProduct[] }>>(url);

        return {
            entities: data.products,
            totalPages: data.total / pageSize
        };
    }
}

export default ProductStore;
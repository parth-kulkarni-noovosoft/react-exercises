import { action, makeObservable, observable } from "mobx"
import { IProduct, Paginated, QueryData } from "../interfaces";
import Networking from "../networking"
import ListTableStore from "./ListTableStore"
import RootStore from "./RootStore"

class ProductStore {
    @observable categories: string[] = [];
    public productsListingStore: ListTableStore<IProduct>;

    constructor(
        public rootStore: RootStore
    ) {
        makeObservable(this);
        this.productsListingStore = new ListTableStore('products', this.getProducts);
        this.getCategories();
    }

    @action setCategories = (categories: string[]) => {
        if (this.categories.includes('All')) {
            this.categories = categories
        } else {
            this.categories = [...categories, 'All'];
        }
    };

    getCategories = async () => {
        const data = await Networking.getData<string[]>('products/categories');
        this.setCategories(data);
    }

    getProducts(queryData: QueryData) {
        const {
            pageNumber,
            pageSize,
            searchQuery,
            filterQuery
        } = queryData;

        const searchParams = new URLSearchParams({
            limit: pageSize.toString(),
            skip: ((pageNumber - 1) * pageSize).toString()
        });

        let baseUrl = 'products/';

        if (searchQuery !== '') {
            baseUrl = 'products/search'
            searchParams.append('q', searchQuery)
        } else if (filterQuery !== '' && filterQuery !== 'All') {
            baseUrl = `products/category/${filterQuery}`
        }

        const url = `${baseUrl}?${searchParams.toString()}`

        return Networking.getData<Paginated<IProduct>>(url);
    }
}

export default ProductStore;
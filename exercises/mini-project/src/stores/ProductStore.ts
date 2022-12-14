import { IProduct, Paginated, QueryData } from "../interfaces";
import Networking from "../networking"
import ListTableStore from "./ListTableStore"
import RootStore from "./RootStore"

class ProductStore {
    public productsListingStore: ListTableStore<Paginated<IProduct>>;
    public productCategoriesStore: ListTableStore<string[]>;

    constructor(
        public rootStore: RootStore
    ) {
        this.productsListingStore = new ListTableStore(this.getProducts);
        this.productCategoriesStore = new ListTableStore(this.getCategories);
    }

    getCategories = async () => Networking.getData<string[]>('products/categories');

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
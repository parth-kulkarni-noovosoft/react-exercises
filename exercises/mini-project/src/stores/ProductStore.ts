import { IProduct, Paginated, QueryData } from "../interfaces";
import Networking from "../networking"
import ListTableStore from "./ListTableStore"
import RootStore from "./RootStore"
import { reaction, toJS } from "mobx";

class ProductStore {
    public productsListingStore: ListTableStore<Paginated<IProduct>>;
    public productCategoriesStore: ListTableStore<string[]>;

    constructor(
        public rootStore: RootStore
    ) {
        this.productsListingStore = new ListTableStore(this.getProducts, 25);
        this.productCategoriesStore = new ListTableStore(this.getCategories);

        reaction(
            () => this.productsListingStore.filterQuery,
            (filterObject) => {
                console.log(toJS(filterObject));
                if (!this.productsListingStore.entities) return null;

                const filteredProducts = this.productsListingStore.entities.products.filter((product) => {
                    if ('category' in filterObject && filterObject.category !== product.category) {
                        return false;
                    }

                    if ('price' in filterObject) {
                        if (filterObject.price !== '' && +filterObject.price < product.price) {
                            return false;
                        }
                    }

                    if ('available' in filterObject) {
                        if (filterObject.available ? product.stock <= 0 : product.stock > 0) {
                            return false;
                        }
                    }

                    return true;
                });

                const newData: { [x: string]: IProduct[] } = {
                    products: filteredProducts
                };

                this.productsListingStore.setFilteredData({
                    ...this.productsListingStore.entities,
                    ...newData,
                });
            }
        )
    }

    getCategories = async () => Networking.getData<string[]>('products/categories');

    getProducts(queryData: QueryData) {
        const {
            pageNumber,
            pageSize,
            searchQuery
        } = queryData;

        const searchParams = new URLSearchParams({
            limit: pageSize.toString(),
            skip: ((pageNumber - 1) * pageSize).toString()
        });

        let baseUrl = 'products/';

        if (searchQuery !== '') {
            baseUrl = 'products/search'
            searchParams.append('q', searchQuery)
        }

        const url = `${baseUrl}?${searchParams.toString()}`

        return Networking.getData<Paginated<IProduct>>(url);
    }
}

export default ProductStore;
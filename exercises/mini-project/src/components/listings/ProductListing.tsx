import { observer } from "mobx-react";
import React from "react";
import RootStoreContext from "../../context/RootStoreContext";
import { FilterTypes } from "../../interfaces";
import Listing from "../Helpers/Listing/Listing";
import Table from "../Helpers/Table/Table";

@observer
class ProductListing extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    componentDidMount() {
      this.context?.productStore.productCategoriesStore.fetchData();
      this.context?.productStore.productsListingStore.fetchData();
    }

    render(): React.ReactNode {
        if (!this.context) return;

        const productStore = this.context.productStore;
        const categories = productStore.productCategoriesStore.entities ?? [];
        if (!categories.includes('All')) categories.unshift('All');

        return (
            <Listing
                listStore={productStore.productsListingStore}
                configuration={{
                    displayFilter: true,
                    options: categories
                }}
                filterConfiguration={{
                    configuration: {
                        'category': {
                            type: FilterTypes.SELECT,
                            displayName: 'Category',
                            options: categories
                        },
                        'price': {
                            displayName: 'Price',
                            type: FilterTypes.NUMBER,
                        },
                        'brand': {
                          displayName: 'Brand',
                          type: FilterTypes.TEXT
                        },
                        'available': {
                          displayName: 'Availability',
                          type: FilterTypes.BOOLEAN
                        }
                    },
                    autoFetch: false
                }}
                render={(products) => (
                    <Table
                        tableContent={products.products}
                        colConfigs={[
                            {
                                heading: 'Name',
                                selector: (data) => data.title,
                            },
                            {
                                heading: 'Category',
                                selector: (data) => data.category
                            },
                            {
                                heading: 'Price',
                                selector: (data) => data.price
                            },
                            {
                                heading: 'Quantity',
                                selector: (data) => data.stock
                            },
                            {
                                heading: 'In Stock',
                                selector: (data) => data.stock > 0 ? 'Yes' : 'No'
                            }
                        ]}
                    />
                )}
            />
        )
    }
}

export default ProductListing;
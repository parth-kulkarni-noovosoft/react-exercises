import { observer } from "mobx-react";
import React from "react";
import { RootStoreContext } from "../../context/RootStoreContext";
import Listing from "../Helpers/Listing/Listing";
import Table from "../Helpers/Table/Table";

@observer
class ProductListing extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render(): React.ReactNode {
        if (!this.context) return;

        const productStore = this.context.productStore;

        return (
            <Listing
                listStore={productStore.productsListingStore}
                configuration={{
                    displayFilter: true,
                    options: productStore.categories
                }}
                render={(products) => (
                    <Table
                        tableContent={products}
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
                        ]}
                    />
                )}
            />
        )
    }
}

export default ProductListing;
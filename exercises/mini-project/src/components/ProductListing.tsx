import { observer } from "mobx-react";
import React from "react";
import { Input } from "reactstrap";
import { RootStoreContext } from "../context/RootStoreContext";
import Select from "./Inputs/Select";
import Listing from "./Listing/Listing";
import Table from "./Table/Table";

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
                controls={({ onChange, value }) => (<>
                    <Input
                        value={value.searchQuery}
                        onChange={(e) => onChange({ name: 'searchQuery', value: e.target.value })}
                    />
                    <Select
                        isDisabled={false}
                        onChange={(value) => onChange({ name: 'filterQuery', value })}
                        value={value.filterQuery}
                        options={productStore.categories}
                    />
                </>)}
            />
        )
    }
}

export default ProductListing;
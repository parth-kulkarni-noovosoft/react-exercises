import React from "react";
import { StoreContext } from "../context/AppContext";

class Home extends React.Component {
    declare context: React.ContextType<typeof StoreContext>
    static contextType = StoreContext;

    render(): React.ReactNode {
        const listing = this.context?.productStore.count === 0
            ? <div>No Product to display</div>
            : this.context?.productStore.products.map(
                product => <div key={product.id} >[{product.id}] - {product.name}</div>
            )

        return <div>
            This is home
            {listing}
            <button
                onClick={() => this.context?.routerStore.goTo('addProduct')}
            >Add Product</button>
        </div>
    }
}

export default Home;
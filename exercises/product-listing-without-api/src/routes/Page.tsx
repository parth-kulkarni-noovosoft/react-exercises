import React from "react";
import { StoreContext } from "../context/AppContext";
import ProductListing from "../components/ProductListing";
import { RouterLink } from "mobx-state-router";

class Page extends React.Component {
    context: React.ContextType<typeof StoreContext> | undefined
    static contextType = StoreContext;

    render(): React.ReactNode {
        const { routerStore } = this.context!;
        const isCart = routerStore.getCurrentRoute()?.name === 'cart';

        return <div className="container">
            <nav className="nav">
                <div>
                    <span className="title">This is {isCart ? 'Cart' : 'Home'}</span>
                </div>
                <div className="links">
                    <RouterLink routeName="home">Home</RouterLink>
                    <RouterLink routeName="cart">Cart</RouterLink>
                    <RouterLink routeName="addProduct">Add Product</RouterLink>
                </div>
            </nav>

            <ProductListing isCart={isCart} />
        </div>
    }
}

export default Page;
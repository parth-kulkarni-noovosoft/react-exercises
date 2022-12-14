import { observer } from "mobx-react";
import React from "react";
import PostListing from "../components/listings/PostListing";
import ProductListing from "../components/listings/ProductListing";
import UserListing from "../components/listings/UserListing";
import RootStoreContext from "../context/RootStoreContext";

@observer
class Listings extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render(): React.ReactNode {
        if (!this.context) return null;

        const routerStore = this.context.routerStore;

        const { entity } = routerStore.routerState.params;

        switch (entity) {
            case 'posts': return <PostListing />
            case 'users': return <UserListing />
            case 'products': return <ProductListing />
            default: {
                routerStore.goToNotFound();
                return null;
            }
        }
    }
}

export default Listings;
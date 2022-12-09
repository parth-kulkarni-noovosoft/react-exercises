import { observer } from "mobx-react";
import React from "react";
import { List } from "reactstrap";
import { RootStoreContext } from "../context/RootStoreContext";
import Listing from "./Listing/Listing";

@observer
class PostListing extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render(): React.ReactNode {
        if (!this.context) return;
        const postListingStore = this.context.postStore.postListingStore;

        return (
            <Listing
                listStore={postListingStore}
                render={(products) => (
                    <List
                        type='unstyled'
                    >
                        {products.map(d => <div key={d.id}>{d.id}: {d.title}</div>)}
                    </List>
                )}
            />
        )
    }
}

export default PostListing;
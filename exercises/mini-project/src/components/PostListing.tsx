import { observer } from "mobx-react";
import React from "react";
import { Badge, Input } from "reactstrap";
import { RootStoreContext } from "../context/RootStoreContext";
import Listing from "./Listing/Listing";
import Table from "./Table/Table";

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
                controls={({ onChange, value }) => (
                    <Input
                        value={value.searchQuery}
                        onChange={(e) => onChange({ name: 'searchQuery', value: e.target.value })}
                    />
                )}

                render={(posts) => (
                    <Table
                        tableContent={posts}
                        colConfigs={[
                            {
                                heading: 'Title',
                                selector: (data) => data.title
                            },
                            {
                                heading: 'Tags',
                                selector: (data) => data.tags.map((tag, i) => <Badge key={i} className="mx-1">{tag}</Badge>)
                            },
                            {
                                heading: 'Reactions',
                                selector: (data) => data.reactions
                            },
                        ]}
                    />
                )}
            />
        )
    }
}

export default PostListing;
import { observer } from "mobx-react";
import React from "react";
import { Badge } from "reactstrap";
import RootStoreContext from "../../context/RootStoreContext";
import Listing from "../Helpers/Listing/Listing";
import Table from "../Helpers/Table/Table";

@observer
class PostListing extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render(): React.ReactNode {
        if (!this.context) return;
        const postStore = this.context.postStore;
        const userStore = this.context.userStore;

        return (
            <Listing
                listStore={postStore.postListingStore}
                configuration={{
                    displaySearch: false
                }}
                render={(posts) => (
                    <Table
                        tableContent={posts.posts}
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
                            {
                                heading: 'Username',
                                selector: (data) => userStore.userMap.get(data.userId)?.username ?? 'Loading...'
                            }
                        ]}
                    />
                )}
            />
        )
    }
}

export default PostListing;
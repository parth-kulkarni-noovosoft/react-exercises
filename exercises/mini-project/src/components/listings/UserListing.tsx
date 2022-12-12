import { observer } from "mobx-react";
import React from "react";
import { RootStoreContext } from "../../context/RootStoreContext";
import Listing from "../Helpers/Listing/Listing";
import Table from "../Helpers/Table/Table";

@observer
class UserListing extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render(): React.ReactNode {
        if (!this.context) return;
        const userListingStore = this.context.userStore.userListingStore;

        return (
            <Listing
                listStore={userListingStore}
                render={(users) => (
                    <Table
                        tableContent={users}
                        colConfigs={[
                            {
                                heading: 'First name',
                                selector: (data) => data.firstName
                            },
                            {
                                heading: 'Last name',
                                selector: (data) => data.lastName
                            },
                        ]}
                    />
                )}
            />
        )
    }
}

export default UserListing;
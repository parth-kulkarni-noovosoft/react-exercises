import { observer } from "mobx-react";
import { RouterLink } from "mobx-state-router";
import React from "react";
import { Card, CardBody, CardTitle, CardText, Container } from "reactstrap";
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

        const { id } = this.context.routerStore.routerState.params;

        const cardsData = [
            {
                title: 'Posts',
                description: 'Listing of Posts and their author\'s usernames.',
                id: 'posts'
            },
            {
                title: 'Products',
                description: 'Listing of Products with search and category fitler.',
                id: 'products'
            },
            {
                title: 'Users',
                description: 'Listing of Users with search',
                id: 'users'
            },
        ];

        switch (id) {
            case 'posts': return <PostListing />
            case 'users': return <UserListing />
            case 'products': return <ProductListing />
        }

        return (
            <Container className="d-flex gap-4">
                {cardsData.map((data) => (
                    <Card
                        key={data.id}
                        className="my-2"
                        style={{ width: '18rem' }}
                    >
                        <CardBody>
                            <CardTitle tag="h5">{data.title}</CardTitle>
                            <CardText>{data.description}</CardText>
                            <RouterLink
                                routeName="listings"
                                params={{ 'id': data.id }}
                                className='text-decoration-none btn btn-outline-primary'
                            >
                                View
                            </RouterLink>
                        </CardBody>
                    </Card>

                ))}
            </Container>
        )
    }
}

export default Listings;
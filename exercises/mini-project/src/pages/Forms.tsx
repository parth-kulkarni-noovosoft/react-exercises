import { observer } from "mobx-react";
import { RouterLink } from "mobx-state-router";
import React from "react";
import { Card, CardBody, CardTitle, CardText, Container } from "reactstrap";
import MultiInputForm from "../components/forms/MultiInputForm";
import RootStoreContext from "../context/RootStoreContext";

@observer
class Listings extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render(): React.ReactNode {
        if (!this.context) return null;

        const routerStore = this.context.routerStore;

        const { id } = routerStore.routerState.params;

        const cardsData = [
            {
                title: 'Multi Input Form',
                description: 'Form with 2 required text inputs and 2 JsonInput',
                id: 'multi'
            },
        ];

        switch (id) {
            case 'multi': return <MultiInputForm />
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
                                routeName="forms"
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
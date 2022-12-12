import { observer } from "mobx-react";
import React from "react";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import { ButtonGroup, Button, Container } from "reactstrap";
import ListTableStore from "../../stores/ListTableStore";

interface IListingProps<T> {
    listStore: ListTableStore<T>
    controls: (data: {
        value: { searchQuery: string, filterQuery: string }
        onChange: (event: { name: 'searchQuery' | 'filterQuery', value: string }) => void
    }) => JSX.Element | JSX.Element[]
    render: (data: T[]) => JSX.Element | JSX.Element[]
}


@observer
class Listing<T> extends React.Component<IListingProps<T>> {
    render(): React.ReactNode {
        const { listStore } = this.props;
        if (!listStore.entities) return null;

        return (
            <Container>
                {this.props.controls({
                    onChange: (event) => {
                        event.name === 'searchQuery'
                            ? listStore.setSearchQuery(event.value)
                            : listStore.setFilterQuery(event.value)
                    },
                    value: {
                        filterQuery: listStore.filterQuery,
                        searchQuery: listStore.searchQuery
                    }
                })}
                {
                    listStore.isLoading
                        ? <div>Loading pls wait...</div>
                        : this.props.render(listStore.entities)
                }
                <ButtonGroup>
                    <Button
                        onClick={() => listStore.setPageNumber(listStore.pageNumber - 1)}
                        disabled={listStore.pageNumber === 1}
                    >
                        <CaretLeft />
                    </Button>
                    <Button disabled>{listStore.pageNumber}</Button>
                    <Button
                        onClick={() => listStore.setPageNumber(listStore.pageNumber + 1)}
                        disabled={listStore.pageNumber >= listStore.totalPages}
                    >
                        <CaretRight />
                    </Button>
                </ButtonGroup>
            </Container>
        )
    }
}

export default Listing;
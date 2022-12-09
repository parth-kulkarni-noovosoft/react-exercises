import { observer } from "mobx-react";
import React from "react";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import { ButtonGroup, Button, Container } from "reactstrap";
import ListTableStore from "../../stores/ListTableStore";

interface ITableProps<T> {
    listStore: ListTableStore<T>
    render: (data: T[]) => JSX.Element | JSX.Element[]
}

@observer
class Listing<T> extends React.Component<ITableProps<T>> {
    render(): React.ReactNode {
        const { listStore } = this.props;
        if (!listStore.entities) return null;

        return (
            <Container>
                {this.props.render(listStore.entities)}
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
                        disabled={listStore.pageNumber === listStore.totalPages}
                    >
                        <CaretRight />
                    </Button>
                </ButtonGroup>
            </Container>
        )
    }
}

export default Listing;
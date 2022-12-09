import { observer } from "mobx-react";
import React from "react";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import { ButtonGroup, Button, Container, Input } from "reactstrap";
import FormStore from "../../stores/FormStore";
import ListTableStore from "../../stores/ListTableStore";
import Field from "../Form/Field";

interface IListingProps<T> {
    listStore: ListTableStore<T>
    render: (data: T[]) => JSX.Element | JSX.Element[]
}

class QueryData {
    query = ''
}

const formStore = new FormStore(new QueryData());

@observer
class Listing<T> extends React.Component<IListingProps<T>> {
    render(): React.ReactNode {
        const { listStore } = this.props;
        if (!listStore.entities) return null;

        return (
            <Container>
                <Field
                    label="Search"
                    storeProps={formStore}
                    name='query'
                    onChange={(data) => listStore.setSearchQuery(data)}
                    render={({ disabled, invalid, onChange, value }) => (
                        <Input
                            value={value}
                            invalid={invalid}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={disabled}
                        />
                    )}
                />
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
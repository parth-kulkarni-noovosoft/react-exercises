import { observer } from "mobx-react";
import React from "react";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import { ButtonGroup, Button, Container, Input } from "reactstrap";
import ListTableStore from "../../../stores/ListTableStore";
import Select from "../Inputs/Select";

interface IListingProps<T extends unknown[] | object> {
    listStore: ListTableStore<T>
    configuration?: {
        displaySearch?: boolean,
        displayFilter?: boolean,
        options?: string[]
    }
    render: (data: T) => JSX.Element | JSX.Element[]
}


@observer
class Listing<T extends object | unknown[]> extends React.Component<IListingProps<T>> {
    render(): React.ReactNode {
        const { listStore } = this.props;
        if (!listStore.entities) return null;

        const configuration = {
            displayFilter: false,
            displaySearch: true,
            options: [],
            ...this.props.configuration
        }

        const SearchBar = (<>
            <div>Search</div>
            <Input
                value={listStore.searchQuery}
                onChange={(e) => listStore.setSearchQuery(e.target.value)}
            />
        </>)

        const FilterDropDown = (<>
            <div>Filter</div>
            <Select
                isDisabled={false}
                onChange={(value) => listStore.setFilterQuery(value)}
                value={listStore.filterQuery}
                options={configuration.options}
            />
        </>)

        return (
            <Container className="py-2">
                {configuration.displaySearch && SearchBar}
                {configuration.displayFilter && FilterDropDown}
                {
                    listStore.isLoading
                        ? <div>Loading pls wait...</div>
                        : this.props.render(listStore.entities)
                }
                <ButtonGroup className="d-flex">
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
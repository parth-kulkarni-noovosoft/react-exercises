import { observer } from "mobx-react";
import React from "react";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";
import { ButtonGroup, Button, Container, Input } from "reactstrap";
import { IFilterPickerProps } from "../../../interfaces";
import ListTableStore from "../../../stores/ListTableStore";
import FilterPicker from "../FilterPicker/FilterPicker";

interface IListingProps<T extends unknown[] | object> {
    listStore: ListTableStore<T>
    configuration?: {
        displaySearch?: boolean,
        displayFilter?: boolean,
        options?: string[]
    }
    render: (data: T) => JSX.Element | JSX.Element[]
    filterConfiguration?: IFilterPickerProps
}

@observer
class Listing<T extends object | unknown[]> extends React.Component<IListingProps<T>> {
    render(): React.ReactNode {
        const { listStore } = this.props;
        if (!listStore.entities || !listStore.filteredEntities) return null;

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

        return (
            <Container className="py-2">
                {configuration.displaySearch && SearchBar}
                {configuration.displayFilter && (
                    <FilterPicker
                        {...this.props.filterConfiguration!}
                        onChange={(data) => listStore.setFilterQuery(
                            data,
                            this.props.filterConfiguration?.autoFetch
                        )}
                    />)
                }
                {
                    listStore.isLoading
                        ? <div>Loading pls wait...</div>
                        : this.props.render(
                            Object.keys(listStore.filterQuery).length !== 0
                                ? listStore.filteredEntities
                                : listStore.entities
                        )
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
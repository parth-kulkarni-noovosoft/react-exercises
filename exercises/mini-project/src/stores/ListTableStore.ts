import { action, makeObservable, observable } from "mobx";
import { QueryData } from "../interfaces";

class ListTableStore<T extends unknown[] | object> {
    @observable entities: T | null = null;
    @observable pageNumber = 1;
    @observable totalPages = 1;
    @observable isLoading = false;

    @observable filteredEntities: T | null = null;

    @observable searchQuery = '';
    @observable filterQuery: Record<string, string | number | boolean> = {};

    constructor(
        public fetcher: (queryData: QueryData<T>) => Promise<T>,
        public pageSize = 10
    ) {
        makeObservable(this);
    }

    public fetchData = async () => {
        if (this.isLoading) return;

        this.setIsLoading(true);
        const data = await this.fetcher({
            filterQuery: this.filterQuery,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            searchQuery: this.searchQuery
        });
        this.setData(data);
    }

    @action setIsLoading = (isLoading: boolean) => this.isLoading = isLoading;

    @action setData = (data: T) => {
        this.setIsLoading(false);
        this.setFilteredData(data);
        this.entities = data;
        if ('total' in data) {
            this.totalPages = (data.total as number) / this.pageSize;
        }
    }

    @action setFilteredData = (data: T) => {
        this.filteredEntities = data;
        if ('total' in data) {
            this.totalPages = (data.total as number) / this.pageSize;
        }
    }

    @action setPageNumber = (pageNumber: number) => {
        this.pageNumber = pageNumber;
        this.fetchData();
    };

    @action setPageSize = (pageSize: number) => this.pageSize = pageSize;

    @action setFilterQuery = (filterQuery: Record<string, string | number | boolean>, autoFetch = true) => {
        this.filterQuery = filterQuery;
        this.pageNumber = 1;
        if (autoFetch) this.fetchData();
    }

    @action setSearchQuery = (searchQuery: string) => {
        this.searchQuery = searchQuery;
        this.pageNumber = 1;
        this.fetchData();
    };
}

export default ListTableStore;
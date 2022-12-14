import { action, makeObservable, observable } from "mobx";
import { QueryData } from "../interfaces";

class ListTableStore<T extends unknown[] | object> {
    @observable entities: T | null = null;
    @observable pageSize = 10;
    @observable pageNumber = 1;
    @observable totalPages = 1;
    @observable isLoading = false;

    @observable searchQuery = '';
    @observable filterQuery = 'All';

    constructor(
        public fetcher: (queryData: QueryData<T>) => Promise<T>
    ) {
        makeObservable(this);

        this.fetchData();
    }

    fetchData = async () => {
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
        this.entities = data;
        if ('total' in data) {
            this.totalPages = (data.total as number) / this.pageSize;
        }
    }

    @action setPageNumber = (pageNumber: number) => {
        this.pageNumber = pageNumber;
        this.fetchData();
    };

    @action setPageSize = (pageSize: number) => this.pageSize = pageSize;

    @action setFilterQuery = (filterQuery: string) => {
        this.filterQuery = filterQuery;
        this.pageNumber = 1;
        this.fetchData();
    }

    @action setSearchQuery = (searchQuery: string) => {
        this.searchQuery = searchQuery;
        this.pageNumber = 1;
        this.fetchData();
    };
}

export default ListTableStore;
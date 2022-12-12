import { action, makeObservable, observable } from "mobx";
import { Paginated, QueryData } from "../interfaces";

class ListTableStore<T> {
    @observable entities: T[] = []
    @observable pageSize = 10;
    @observable pageNumber = 1;
    @observable totalPages = 1;
    @observable isLoading = false;

    @observable searchQuery = '';
    @observable filterQuery = 'All';

    constructor(
        public name: string,
        public fetcher: (queryData: QueryData<T>) => Promise<Paginated<T>>
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

    @action setData = (data: Paginated<T>) => {
        this.setIsLoading(false);
        this.entities = data[this.name];
        this.totalPages = data.total / this.pageSize;
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
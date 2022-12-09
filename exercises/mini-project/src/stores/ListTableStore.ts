import { action, makeObservable, observable } from "mobx";
import { Paginated } from "../interfaces";

class ListTableStore<T> {
    @observable entities: T[] = []
    @observable pageSize = 10
    @observable pageNumber = 1;
    @observable totalPages = 1;
    @observable searchQuery = '';
    @observable isLoading = false;

    constructor(
        public name: string,
        public fetcher: (pageNumber: number, searchQuery: string) => Promise<Paginated<T>>
    ) {
        makeObservable(this);

        this.fetchData();
    }

    fetchData = async () => {
        this.setIsLoading(true);
        const data = await this.fetcher(this.pageNumber, this.searchQuery);
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

    @action setSearchQuery = (searchQuery: string) => {
        this.searchQuery = searchQuery;
        this.fetchData();
    };

}

export default ListTableStore;
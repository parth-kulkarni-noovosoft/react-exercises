import { action, makeObservable, observable, reaction } from "mobx";

interface IFetcherReturn<T> {
    entities: T[]
    totalPages: number
}

class ListTableStore<T extends unknown> {
    @observable entities: T[] = [];
    @observable pageNumber: number = 1;
    @observable totalPages: number = 1;

    constructor(
        public fetcher: (n: number) => Promise<IFetcherReturn<T>>
    ) {
        makeObservable(this);
        reaction(
            () => this.pageNumber,
            () => {
                this.fetcher(this.pageNumber)
                    .then(data => this.setData(data))
                    .catch((e) => console.error(e))
            },
            {
                fireImmediately: true
            }
        )
    }

    @action setData = (data: IFetcherReturn<T>) => {
        this.entities = data.entities;
        this.totalPages = data.totalPages;
    }

    @action setPageNumber = (pageNumber: number) => this.pageNumber = pageNumber;

}

export default ListTableStore;
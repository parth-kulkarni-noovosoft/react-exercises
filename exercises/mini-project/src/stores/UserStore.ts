import { action, makeObservable, observable } from "mobx";
import { IUser, Paginated, QueryData } from "../interfaces";
import Networking from "../networking";
import ListTableStore from "./ListTableStore";
import RootStore from "./RootStore";

class UserStore {
    userListingStore: ListTableStore<Paginated<IUser>>;
    @observable userMap: Map<number, IUser> = new Map();

    constructor(
        public rootStore: RootStore
    ) {
        makeObservable(this);
        this.userListingStore = new ListTableStore(this.getUsers);
    }

    @action updateMap = (users: IUser[]) => users.forEach((user) => this.userMap.set(user.id, user));

    getUser = (userId: number) => Networking.getData<IUser>(`users/${userId}`);

    getUsers = (queryData: QueryData) => {
        const {
            pageNumber,
            pageSize,
            searchQuery
        } = queryData;

        const searchParams = new URLSearchParams({
            limit: pageSize.toString(),
            skip: ((pageNumber - 1) * pageSize).toString()
        })

        let baseURL = 'users/';

        if (searchQuery !== '') {
            searchParams.append('q', searchQuery)
            baseURL += 'search';
        }

        const url = `${baseURL}/?${searchParams.toString()}`

        return Networking.getData<Paginated<IUser>>(url);
    }
}

export default UserStore;
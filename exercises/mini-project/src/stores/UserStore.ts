import { IUser, Paginated, QueryData } from "../interfaces";
import Networking from "../networking";
import ListTableStore from "./ListTableStore";
import RootStore from "./RootStore";

class UserStore {
    userListingStore: ListTableStore<IUser>;

    constructor(
        public rootStore: RootStore
    ) {
        this.userListingStore = new ListTableStore('users', this.getUsers);
    }

    getUsers = async (queryData: QueryData) => {
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
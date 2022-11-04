import { useEffect, useState } from "react";
import { IUserInfo, PaginatedResponse } from "../typings";

type UserNameAndId = Pick<IUserInfo, 'firstName' | 'id'>

const useAllUserNames = () => {
    const [userNames, setUserNames] = useState<UserNameAndId[]>([]);

    useEffect(() => {
        const getAllUserNames = async () => {
            const allUserFirstNames: PaginatedResponse<{ users: UserNameAndId[] }> = await (
                    await fetch('https://dummyjson.com/users?limit=100&select=firstName', { cache: 'force-cache' })
                ).json();
            setUserNames(allUserFirstNames.users);
        }
        getAllUserNames().catch(e => console.error(e));
    }, [])

    return userNames;
}

export default useAllUserNames;
import React, { PropsWithChildren, useMemo, useState } from "react";
import { Routes } from "../constants";
import useFetch from "../hooks/useFetch";
import { IUserInfo } from "../types";

const UserContext = React.createContext<{
    userID: number;
    userInfo: IUserInfo | null;
    changeUser: (id: number) => void
}>({
    userID: 5,
    userInfo: null,
    changeUser() {
        // defined as default value, does nothing
    }
});


export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userID, setUserID] = useState<number>(5);
    const userInfo = useFetch<IUserInfo>(Routes.user(userID));
    
    const contextValue = useMemo(() => ({
        userID,
        userInfo,
        changeUser(id: number) { setUserID(id) }
    }), [userID, userInfo])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;

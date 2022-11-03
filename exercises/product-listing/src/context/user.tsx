import React, { PropsWithChildren, useMemo, useState } from "react";

const UserContext = React.createContext<{
    userID: number;
    changeUser: (id: number) => void
}>({
    userID: 5,
    changeUser() {}
});


export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userID, setUserID] = useState<number>(5);
    
    const contextValue = useMemo(() => ({
        userID,
        changeUser(id: number) { setUserID(id) }
    }), [userID])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;

import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

interface IUserInfo {
    id: number,
    firstName: string,
    lastName: string,
}

const useUserInformation = () => {
    const userID = useContext(UserContext);
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo: IUserInfo = await (await fetch(`https://dummyjson.com/users/${userID}?select=id,firstName,lastName`)).json()
            setUserInfo(userInfo)
        }

        getUserInfo();
    }, [userID])

    return userInfo;
}

export default useUserInformation;
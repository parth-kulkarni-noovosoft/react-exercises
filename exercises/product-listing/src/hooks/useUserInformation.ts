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
            const userInfo: IUserInfo = await (await fetch(`https://dummyjson.com/users/${userID}`)).json()
            setUserInfo({
                id: userInfo.id,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName
            })
        }

        getUserInfo();
    }, [userID])

    return userInfo;
}

export default useUserInformation;
import React, { useContext, useMemo } from "react"
import UserContext from "../../context/user";
import { PropertiesReducerAction, PropertyChangeEvents } from "../../reducers/propertiesReducer";
import { IPropertiesState, IUserInfo, PaginatedResponse } from "../../types";
import { Link, useLocation } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import { Routes } from "../../constants";

import './Navbar.css';

interface INavbarProps {
    cartSize: number;
    properties: IPropertiesState
    dispatch: React.Dispatch<PropertiesReducerAction>
}

const Navbar: React.FC<INavbarProps> = ({
    cartSize,
    properties,
    dispatch
}) => {
    const categories = useFetch<string[]>(Routes.categories()) ?? [];
    const { userInfo } = useContext(UserContext);
    const allUserNames = useFetch<PaginatedResponse<{
        users: IUserInfo[]
    }>>(Routes.users());

    const { userID, changeUser } = useContext(UserContext);

    const userNameOptionsArray = useMemo(
        () => allUserNames?.users?.map(
            (userInfo) => (<option value={userInfo.id} key={userInfo.id}>
                {userInfo.firstName}
            </option>)
        ),
        [allUserNames]);

    const location = useLocation();
    const to = location.pathname === '/' ? '/cart' : '/';
    const toText = to === '/' ? 'Home' : 'Cart';

    return (
        <div className="input-container">
            <input
                className="query"
                type="text"
                name="query"
                id="query"
                onChange={(e) => dispatch({ type: PropertyChangeEvents.QUERY, payload: e.target.value })}
                value={properties.query}
                placeholder='Search Query'
            />
            <select
                className="category"
                name="category"
                id="category"
                onChange={(e) => dispatch({ type: PropertyChangeEvents.CATEGORY, payload: e.target.value })}
                value={properties.category}
            >
                {['All', ...categories,].map((category, idx) => {
                    return <option value={category} key={`${category}${idx}`}>{category}</option>
                })}
            </select>
            <div className="status bordered">
                <Link to={to} className='link'>
                    <span>{userInfo?.firstName ?? 'default'}&apos;s Cart</span>
                    <span>{cartSize} Product{cartSize > 1 ? 's' : ''}</span>
                    <span>Go to {toText}</span>
                </Link>
            </div>
            <select
                className="user-selection"
                name="user"
                id="user"
                onChange={(e) => changeUser(+e.target.value)}
                value={userID}
            >
                {userNameOptionsArray}
            </select>
        </div>
    )
}

export default Navbar
import React, { useContext, useMemo } from "react"
import UserContext from "../context/user";
import useAllUserNames from "../hooks/useAllUserNames";
import useCategories from "../hooks/useCategories";
import useUserInformation from "../hooks/useUserInformation";
import { PropertiesReducerAction, PropertyChangeEvents } from "../reducers/propertiesReducer";
import { IPropertiesState } from "../typings";
import { Link } from 'react-router-dom';
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
    const categories = useCategories();
    const userInfo = useUserInformation();
    const allUserNames = useAllUserNames();

    const { userID, changeUser } = useContext(UserContext);

    const userNameOptionsArray = useMemo(() =>
            allUserNames
            .map((userInfo) => <option value={userInfo.id} key={userInfo.id}>{userInfo.firstName}</option>),
        [allUserNames]);

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
                {categories.map((category, idx) => {
                    return <option value={category} key={`${category}${idx}`}>{category}</option>
                })}
            </select>
            <div className="status bordered">
                <Link to='/cart' className='link'>
                    <span>{userInfo?.firstName ?? 'default'}&apos;s Cart</span>
                    <span>{cartSize} Item{cartSize > 1 ? 's' : ''}</span>
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
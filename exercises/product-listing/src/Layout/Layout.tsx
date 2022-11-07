import React, { useReducer } from 'react';
import { Outlet } from "react-router-dom";
import useCart from '../hooks/useCart';
import propertiesReducer from '../reducers/propertiesReducer';
import Navbar from "../components/Navbar/Navbar";

const Layout: React.FC = () => {
    const [properties, dispatch] = useReducer(propertiesReducer, {
        category: 'All',
        query: '',
    })

    const cart = useCart();

    return (<>
        <div className="container">
            <Navbar
                properties={properties}
                dispatch={dispatch}
                cartSize={cart.getProductIDs().length}
            />
            <Outlet context={{ properties, dispatch, cart }} />
        </div>
    </>);
}

export default Layout;
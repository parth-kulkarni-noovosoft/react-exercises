import React from 'react';
import RootStore from '../stores';
import {observer} from "mobx-react-lite";
import Listing from "../components/Listing";

const Home = observer(() => {
    return <div>
        This is home
        <Listing getStore={() => RootStore.ownerStore} />
        <br/>
        <Listing getStore={() => RootStore.petStore} />
    </div>
});

export default Home;
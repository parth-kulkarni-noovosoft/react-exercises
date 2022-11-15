import React from "react";
import { RouterLink } from "mobx-state-router";

class NotFound extends React.Component {
    render(): React.ReactNode {
        return (
            <div className='container'>
                <h1>
                    <div>Page Not Found</div>
                    <RouterLink routeName='home'>Home</RouterLink>
                </h1>
            </div>
        )
    }
}

export default NotFound;
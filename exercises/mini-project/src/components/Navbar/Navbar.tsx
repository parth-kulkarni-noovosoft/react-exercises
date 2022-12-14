import { observer } from "mobx-react";
import { RouterLink } from "mobx-state-router";
import React from "react";
import { Nav, NavItem, Navbar as BootstrapNavbar } from "reactstrap";
import RootStoreContext from "../../context/RootStoreContext";

@observer
class Navbar extends React.Component {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render(): React.ReactNode {
        if (!this.context) return null;
        const getRouterClassName = (routeName: string) => {
            const baseClassName = 'text-decoration-none btn';

            if (!this.context) return baseClassName;
            const curRoute = this.context?.routerStore.getCurrentRoute();
            if (!curRoute) return baseClassName;

            const name = this.context.routerStore.routerState.routeName;
            if (name === routeName) return `${baseClassName} btn-primary`
            return `${baseClassName} btn-outline-primary`;
        }

        const routes = ['listings', 'forms']

        return (
            <div>
                <BootstrapNavbar
                    light
                >
                    <Nav className="m-auto gap-4">
                        {(routes).map((route) => (
                            <NavItem>
                                <RouterLink
                                    routeName={route}
                                    className={getRouterClassName(route)}
                                >{route.substring(0, 1).toUpperCase() + route.substring(1)}</RouterLink>
                            </NavItem>

                        ))}
                    </Nav>
                </BootstrapNavbar>
            </div>
        );
    }
}

export default Navbar;
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

            const { entity } = this.context.routerStore.routerState.params;
            if (entity === routeName) return `${baseClassName} btn-primary`
            return `${baseClassName} btn-outline-primary`;
        }

        getRouterClassName('');

        return (
            <div>
                <BootstrapNavbar
                    light
                >
                    <Nav className="m-auto gap-4">
                        <NavItem>
                            <RouterLink
                                routeName="listings"
                                params={{
                                    'entity': 'posts'
                                }}
                                className={getRouterClassName('posts')}
                            >Posts</RouterLink>
                        </NavItem>
                        <NavItem>
                            <RouterLink
                                routeName="listings"
                                params={{
                                    'entity': 'products'
                                }}
                                className={getRouterClassName('products')}
                            >Products</RouterLink>
                        </NavItem>
                        <NavItem>
                            <RouterLink
                                routeName="listings"
                                params={{
                                    'entity': 'users'
                                }}
                                className={getRouterClassName('users')}
                            >Users</RouterLink>
                        </NavItem>
                    </Nav>
                </BootstrapNavbar>
            </div>
        );
    }
}

export default Navbar;
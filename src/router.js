import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import TopNavigation from "./components/top_navigation/app.bar";
import {Route} from "react-router-dom";
import {history} from "./store";
import {Home} from "./components/home";
import {Login} from "./components/routes/login/login.container";
import {Register} from "./components/routes/register/register.container";
import {userIsAuthenticated, userIsNotAuthenticated} from "./utils/authentication";

export const ConnectedRouting = () => {
    return (
        <ConnectedRouter history={history}>
            <div>
                <TopNavigation />
                <div className="container">
                    {
                        authenticatedRoutes.map((route, index) => (
                            <Route
                                key={index}
                                exact={route.exact}
                                path={route.path}
                                component={userIsAuthenticated(route.component)}
                            />
                        ))
                    }
                    {
                        unauthenticatedRoutes.map((route, index) => (
                            <Route
                                key={index}
                                exact={route.exact}
                                path={route.path}
                                component={userIsNotAuthenticated(route.component)}
                            />
                        ))
                    }
                </div>
            </div>
        </ConnectedRouter>
    )
};

const authenticatedRoutes = [
    {
        path: '/',
        exact: true,
        component: Home
    }
];

const unauthenticatedRoutes = [
    {
        path: '/login',
        exact: false,
        component: Login
    },
    {
        path: '/register',
        exact: false,
        component: Register
    }
];
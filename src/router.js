import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import TopNavigation from "./components/top_navigation/app.bar";
import {Route} from "react-router-dom";
import {history} from "./store";
import {Home} from "./components/home";
import {Login} from "./components/login/login.container";

export const ConnectedRouting = () => {
    return (
        <ConnectedRouter history={history}>
            <div>
                <TopNavigation />
                <div>
                    {
                        routes.map((route, index) => (
                            <Route
                                key={index}
                                exact={route.exact}
                                path={route.path}
                                component={route.component}
                            />
                        ))
                    }
                </div>
            </div>
        </ConnectedRouter>
    )
};

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/login',
        exact: false,
        component: Login
    }
];
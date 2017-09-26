import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import TopNavigation from "./components/top_navigation/app.bar";
import {Route} from "react-router-dom";
import {history} from "./store";
import {Home} from "./components/home";
import {Login} from "./components/routes/login/login.container";
import {Register} from "./components/routes/register/register.container";
import {userIsAuthenticated, userIsNotAuthenticated} from "./utils/authentication";
import {Player} from "./components/routes/players/list.players";
import {AddPlayer} from "./components/routes/players/add/add.players.container";
import {AddTraining} from "./components/routes/training/add/add.training.form.container";

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

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const PLAYERS_ROUTE = "/players";
export const ADD_PLAYER_ROUTE = `/${PLAYERS_ROUTE}/add`;
export const ADD_TRAINING_ROUTE = "/trainings/add";

const authenticatedRoutes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: PLAYERS_ROUTE,
        exact: true,
        component: Player
    },
    {
        path: ADD_PLAYER_ROUTE,
        exact: false,
        component: AddPlayer
    },
    {
        path: ADD_TRAINING_ROUTE,
        exact: false,
        component: AddTraining
    }
];

const unauthenticatedRoutes = [
    {
        path: LOGIN_ROUTE,
        exact: false,
        component: Login
    },
    {
        path: REGISTER_ROUTE,
        exact: false,
        component: Register
    },
];
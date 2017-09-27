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
import {Grid} from "material-ui";
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    container: {
        paddingTop: 10,
        [theme.breakpoints.up('md')]: {
            width: '70%',
            margin: '0 auto'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '0 auto'
        }
    }
});

const ConnectedRouting = (props) => {
    return (
        <ConnectedRouter history={history}>
            <div>
                <TopNavigation />
                <Grid container className={props.classes.container} spacing={24}>
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
                </Grid>
            </div>
        </ConnectedRouter>
    )
};

export default withStyles(styles)(ConnectedRouting);

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const PLAYERS_ROUTE = "/players";
export const ADD_PLAYER_ROUTE = `${PLAYERS_ROUTE}/add`;
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
import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import TopNavigation from "./components/top_navigation/app.bar";
import {Route} from "react-router-dom";
import {history} from "./store/store";
import {Home} from "./components/home";
import {Login} from "./components/routes/login/login.container";
import {Register} from "./components/routes/register/register.container";
import {userIsAuthenticated, userIsNotAuthenticated} from "./utils/authentication";
import {AllPlayers} from "./components/routes/players/all.players";
import {AddPlayer} from "./components/routes/players/add/add.players.container";
import {AddTraining} from "./components/routes/training/add/add.training.container";
import {Grid} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {AddSeason} from "./components/routes/seasons/add/add.season.container";
import {AllTrainings} from "./components/routes/training/all.trainings";

export const INDEX_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const PLAYERS_ROUTE = "/players";
export const ADD_PLAYER_ROUTE = `${PLAYERS_ROUTE}/add`;
export const TRAININGS_ROUTE = "/trainings";
export const ADD_TRAINING_ROUTE = `${TRAININGS_ROUTE}/add`;
export const ADD_SEASONS_ROUTE = "/seasons/add";

const authenticatedRoutes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: PLAYERS_ROUTE,
        exact: true,
        component: AllPlayers
    },
    {
        path: ADD_PLAYER_ROUTE,
        exact: false,
        component: AddPlayer
    },
    {
        path: TRAININGS_ROUTE,
        exact: true,
        component: AllTrainings
    },
    {
        path: ADD_TRAINING_ROUTE,
        exact: false,
        component: AddTraining
    },
    {
        path: ADD_SEASONS_ROUTE,
        exact: false,
        component: AddSeason
    },
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

const styles = theme => ({
    container: {
        paddingTop: 80,
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
    const authenticatedRouteComponents = authenticatedRoutes.map((route) => {
        return <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={userIsAuthenticated(route.component)}
        />
    });

    const unauthenticatedRouteComponents = unauthenticatedRoutes.map(route => {
        return <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={userIsNotAuthenticated(route.component)}
        />
    });

    return (
        <ConnectedRouter history={history}>
            <div>
                <TopNavigation/>
                <Grid container className={props.classes.container} spacing={24}>
                    {authenticatedRouteComponents}
                    {unauthenticatedRouteComponents}
                </Grid>
            </div>
        </ConnectedRouter>
    )
};

export default withStyles(styles)(ConnectedRouting);
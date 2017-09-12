import firebase from 'firebase';
import {createStore, compose, applyMiddleware} from "redux";
import {makeRootReducer} from "./reducer";
import {reactReduxFirebase} from 'react-redux-firebase';
import {firebaseConfig, reduxFirebase} from "./config";
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from "react-router-redux";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const history = createHistory({basename: '/'});
const reduxRouterMiddleware = routerMiddleware(history);

export function configureStore() {
    const middlewares = [reduxRouterMiddleware];

    return createStore(
        makeRootReducer(),
        compose(
            reactReduxFirebase(
                firebaseApp, reduxFirebase
            )
        ),
        applyMiddleware(...middlewares)
    )
}
import {connectedRouterRedirect} from "redux-auth-wrapper/history4/redirect";
import {isEmpty, isLoaded} from 'react-redux-firebase';

export const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    allowRedirectBack: false,
    authenticatedSelector: state => !isEmpty(state.firebase.auth),
    authenticatingSelector: state => !isLoaded(state.firebase.auth),
    wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => isEmpty(state.firebase.auth),
    authenticatingSelector: state => !isLoaded(state.firebase.auth),
    wrapperDisplayName: 'UserIsNotAuthenticated'
});
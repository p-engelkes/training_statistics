import React from 'react';
import {connectedRouterRedirect} from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {isEmpty, isLoaded} from 'react-redux-firebase';

export const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    allowRedirectBack: false,
    authenticatedSelector: state => {
        console.log(isLoaded(state.firebase.auth) && !isEmpty(state.firebase.auth));
        return isLoaded(state.firebase.auth) && !isEmpty(state.firebase.auth)
    },
    wrapperDisplayName: 'UserIsAuthenticated',
});

const locationHelper = locationHelperBuilder({});

export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => {
        console.log(state.firebase.auth);
        return isEmpty(state.firebase.auth)
    },
    wrapperDisplayName: 'UserIsNotAuthenticated'
});
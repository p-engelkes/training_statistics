import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from "./store";
import {ConnectedRouting} from "./router";
import {MuiThemeProvider, createMuiTheme} from "../node_modules/material-ui/styles/index";
import './app.scss';

const store = configureStore();
const theme = createMuiTheme({});

export const App = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <ConnectedRouting />
            </MuiThemeProvider>
        </Provider>
    )
};
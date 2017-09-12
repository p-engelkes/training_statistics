import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {App} from "./app";

injectTapEventPlugin();

const root = document.getElementById('root');

ReactDOM.render(
    <App />,
    root
);
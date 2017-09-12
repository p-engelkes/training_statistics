import React, {Component} from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {LoginForm} from "./login.form";

class LoginPresentation extends Component {
    handleLogin = loginData => {
        return this.props.firebase.login(loginData);
    };

    render() {
        return (
            <LoginForm onSubmit={this.handleLogin}/>
        )
    }
}

const wrappedLogin = firebaseConnect()(LoginPresentation);
export const Login = connect(
    ({firebase: {authError}}) => ({
        authError
    })
)(wrappedLogin);
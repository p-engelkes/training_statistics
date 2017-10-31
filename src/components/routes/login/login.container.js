import React, {Component} from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {LoginForm} from "./login.form";
import {withTitle} from "../../utilities/withTitleHOC";
import {compose} from "redux";

class LoginPresentation extends Component {
    handleLogin = loginData => {
        return this.props.firebase.login(loginData);
    };

    render() {
        return <LoginForm key="1" onSubmit={this.handleLogin}/>
    }
}

export const Login = compose(
    firebaseConnect(),
    connect(
        ({firebase: {authError}}) => ({
            authError
        })
    ),
    withTitle("Login")
)(LoginPresentation);
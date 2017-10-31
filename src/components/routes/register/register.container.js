import React from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {compose} from "redux";
import {withTitle} from "../../utilities/withTitleHOC";
import {RegisterForm} from "./register.form";

class RegisterPresentation extends React.Component {
    handleRegister = registerData => {
        console.log(this.props);
        this.props.firebase.createUser(registerData)
            .then(() => this.props.firebase.login(registerData))
            .catch((error) => {
                console.log(error);
            })
    };

    render() {
        return <RegisterForm key="1" onSubmit={this.handleRegister}/>
    }
}

export const Register = compose(
    firebaseConnect(),
    connect(
        ({firebase: {authError}}) => ({
            authError
        })
    ),
    withTitle("Registrieren")
)(RegisterPresentation);
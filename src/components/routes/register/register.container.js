import React from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import RegisterForm from "./register.form";


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
        return (
            <RegisterForm onSubmit={this.handleRegister}/>
        )
    }
}

const wrappedRegister = firebaseConnect()(RegisterPresentation);
export const Register = connect(
    ({firebase: {authError}}) => ({
        authError
    })
)(wrappedRegister);
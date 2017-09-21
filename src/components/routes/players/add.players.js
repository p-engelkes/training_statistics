import React, {Component} from 'react';
import {PlayerForm} from "./player.form";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class AddPlayerPresentation extends Component {
    handleAdd = player => {
        if (this.props.auth) {
            this.props.firebase.pushWithMeta('/players', player, () => {
                this.props.history.push('/players')
            });
        }
    };

    render() {
        return <PlayerForm
            onSubmit={this.handleAdd}
            title="Spieler hinzufügen"
            buttonLabel="hinzufügen"
        />
    }
}

const wrappedAddPlayer = firebaseConnect()(AddPlayerPresentation);
export const AddPlayer = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withRouter(wrappedAddPlayer));
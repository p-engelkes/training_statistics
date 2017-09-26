import React, {Component} from 'react';
import {AddPlayerForm} from "./add.player.form";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {reset} from 'redux-form';
import {ADD_PLAYER_FORM} from "../../../constants/forms/player.form.constants";

class AddPlayerPresentation extends Component {
    handleAdd = player => {
        if (this.props.auth) {
            const newPlayer = {
                firstName: player.firstName,
                lastName: player.lastName
            };

            this.props.firebase.pushWithMeta(
                '/players',
                newPlayer,
                player.additionalPlayer ? this.resetForm : this.moveToPlayerList
            )
        }
    };

    resetForm = () => {
        this.props.dispatch(reset(ADD_PLAYER_FORM))
    };

    moveToPlayerList = () => {
        this.props.history.push('/players')
    };

    render() {
        return <AddPlayerForm
            onSubmit={this.handleAdd}
            title="Spieler hinzufügen"
        >
        </AddPlayerForm>
    }
}

const wrappedAddPlayer = firebaseConnect()(AddPlayerPresentation);
export const AddPlayer = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withRouter(wrappedAddPlayer));
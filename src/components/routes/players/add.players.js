import React, {Component} from 'react';
import {PlayerForm} from "./player.form";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {FormControlLabel} from "../../../../node_modules/material-ui/Form/index";
import {Checkbox} from "material-ui";

class AddPlayerPresentation extends Component {
    state = {
        addAdditionalPlayer: false
    };

    handleAdd = player => {
        if (this.props.auth) {
            this.props.firebase.pushWithMeta('/players', player, () => {
                this.props.history.push('/players')
            });
        }
    };

    handleChange = (event, checked) => {
        this.setState({addAdditionalPlayer: checked})
    }

    render() {
        return <PlayerForm
            onSubmit={this.handleAdd}
            title="Spieler hinzufügen"
            buttonLabel="hinzufügen"
        >
            <FormControlLabel
                key="button"
                control={
                    <Checkbox
                        checked={this.state.addAdditionalPlayer}
                        onChange={this.handleChange}

                    />
                }
                label="weiteren Spieler hinzufügen"
            />
        </PlayerForm>
    }
}

const wrappedAddPlayer = firebaseConnect()(AddPlayerPresentation);
export const AddPlayer = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withRouter(wrappedAddPlayer));
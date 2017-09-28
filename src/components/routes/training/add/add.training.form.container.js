import React, {Component} from 'react';
import {AddTrainingForm} from "./add.training.form";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {change, reset} from 'redux-form';
import {ADD_TRAINING_FORM, DATE} from "../../../constants/forms/training.form.constants";
import {PLAYER_LOCATION, SEASON_LOCATION, TRAINING_LOCATION} from "../../../constants/api.constants";
import {Heading} from "../../../heading";
import {SEASON} from "../../../constants/forms/season.form.constants";

class AddTrainingPresentation extends Component {
    getCurrentDay() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    componentDidMount() {
        this.props.dispatch(change(ADD_TRAINING_FORM, DATE, this.getCurrentDay()))
    }

    handleAdd = training => {
        if (this.props.auth) {
            this.props.firebase.pushWithMeta(
                `/${TRAINING_LOCATION}`,
                training,
                this.resetForm
            )
        }
    };

    resetForm = () => {
        this.props.dispatch(reset(ADD_TRAINING_FORM));
        this.props.dispatch(change(ADD_TRAINING_FORM, DATE, this.getCurrentDay()));
        this.props.dispatch(change(ADD_TRAINING_FORM, SEASON, ''));
    };

    render() {
        const {players, seasons} = this.props;
        return [
            <Heading key="0" title="Training hinzufügen"/>,
            <AddTrainingForm key="1"
                             onSubmit={this.handleAdd}
                             players={players}
                             seasons={seasons}
            />
        ]
    }
}

const wrappedPlayer = firebaseConnect([`/${PLAYER_LOCATION}`, `/${SEASON_LOCATION}`])(AddTrainingPresentation);
export const AddTraining = (connect(
    ({firebase: {auth, data: {players, seasons}}}) => ({
        auth,
        players,
        seasons
    })
)(wrappedPlayer));
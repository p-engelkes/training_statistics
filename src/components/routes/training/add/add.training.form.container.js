import React, {Component} from 'react';
import {AddTrainingForm} from "./add.training.form";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {change, reset} from 'redux-form';
import {ADD_TRAINING_FORM, DATE} from "../../../constants/forms/training.form.constants";
import {PLAYER_LOCATION, TRAINING_LOCATION} from "../../../constants/api.constants";

class AddTrainingPresentation extends Component {
    componentDidMount() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        this.props.dispatch(change(ADD_TRAINING_FORM, DATE, today))
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
        this.props.dispatch(reset(ADD_TRAINING_FORM))
    };

    render() {
        return <AddTrainingForm onSubmit={this.handleAdd} players={this.props.players}/>
    }
}

const wrappedPlayer = firebaseConnect([`/${PLAYER_LOCATION}`])(AddTrainingPresentation);
export const AddTraining = (connect(
    ({firebase: {auth, data: {players}}}) => ({
        auth,
        players
    })
)(wrappedPlayer));
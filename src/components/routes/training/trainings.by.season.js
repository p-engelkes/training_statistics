import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui";
import {compose} from "redux";
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {TRAINING_LOCATION} from "../../constants/api.constants";
import {connect} from "react-redux";
import {listStyles} from "../../styles";
import TrainingGrid from "./training.grid";
import {change} from 'redux-form';
import {DATE, EDIT_TRAINING_FORM, PLAYERS} from "../../constants/forms/training.form.constants";
import {LoadingSpinner} from "../../utilities/loading.spinner";
import {SEASON} from "../../constants/forms/season.form.constants";

class TrainingsBySeasonComponent extends Component {
    state = {
        selected: null
    };

    updateTraining = training => {
        if (this.props.auth) {
            this.props.firebase.updateWithMeta(`/${TRAINING_LOCATION}/${this.state.selected.key}`, training)
        }
    };

    deleteTraining = key => {
        if (this.props.auth) {
            this.props.firebase.remove(`/${TRAINING_LOCATION}/${key}`);
            if (this.state.selected) {
                this.setState({selected: null})
            }
        }
    };

    handleListItemClicked = selected => {
        this.setState({selected});
        this.props.dispatch(change(EDIT_TRAINING_FORM, SEASON, selected.training.season));
        this.props.dispatch(change(EDIT_TRAINING_FORM, DATE, selected.training.date));
        this.props.dispatch(change(EDIT_TRAINING_FORM, PLAYERS, selected.training.players));
    };

    getSelectedClass = key => {
        const {selected} = this.state;
        const {classes} = this.props;

        if (selected) {
            if (key === selected.key) {
                return classes.selected
            }
        }

        return '';
    };

    render() {
        const {trainingsBySeason, seasons, players} = this.props;

        if (trainingsBySeason) {
            if (isLoaded(trainingsBySeason) && !isEmpty(trainingsBySeason)) {
                return (
                    <TrainingGrid
                        trainings={trainingsBySeason}
                        seasons={seasons}
                        players={players}
                        handleUpdate={this.updateTraining}
                        handleItemClick={this.handleListItemClicked}
                        handleDelete={this.deleteTraining}
                        getSelectedClass={this.getSelectedClass}
                    />
                )
            } else {
                return <LoadingSpinner />
            }
        } else {
            return null
        }
    }
}

export const TrainingsBySeason = compose(
    firebaseConnect((props) => {
        return [
            {
                path: `/${TRAINING_LOCATION}`,
                storeAs: "trainingsBySeason",
                queryParams: ["orderByChild=season", `equalTo=${props.selectedSeasonKey}`]
            }
        ]
    }),
    connect(
        ({firebase: {auth, data: {trainingsBySeason}}}) => ({
            auth,
            trainingsBySeason
        })
    ),
    withStyles(listStyles)
)(TrainingsBySeasonComponent);

TrainingsBySeason.propTypes = {
    selectedSeasonKey: PropTypes.string,
    seasons: PropTypes.object,
    players: PropTypes.object
};
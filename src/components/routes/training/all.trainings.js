import React, {Component} from 'react';
import {SEASON_LOCATION, TRAINING_LOCATION} from "../../constants/api.constants";
import {DATE, EDIT_TRAINING_FORM, PLAYERS} from "../../constants/forms/training.form.constants";
import {change} from 'redux-form';
import {Grid, Input, MenuItem, Select, withStyles} from "material-ui";
import ComponentOrLoading from "../../utilities/component.or.loading";
import ComponentOrNothing from "../../utilities/component.or.nothing";
import {EditTrainingForm} from "./edit/edit.training.form";
import {compose} from "redux";
import {firebaseConnect, isEmpty, isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import {withTitle} from "../../utilities/withTitleHOC";
import TrainingGrid from "./training.grid";
import {listStyles} from "../../styles";
import {LoadingSpinner} from "../../utilities/loading.spinner";

class AllTrainingsComponent extends Component {
    state = {
        selected: null,
        trainings: null
    };

    updateTraining = training => {
        if (this.props.auth) {
            this.props.firebase.updateWithMeta(`/${TRAINING_LOCATION}/${this.state.selected.key}`, training)
        }
    };

    deleteTraining = key => {
        if (this.props.auth) {
            this.props.firebase.remove(`/${TRAINING_LOCATION}/${key}`).catch(err => {
                console.log(err)
            });
            if (this.state.selected) {
               this.setState({selected: null})
            }
        }
    };

    handleListItemClicked = selected => {
        this.setState({selected});
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

    componentWillReceiveProps(nextProps) {
        const {seasons, trainings} = nextProps;
        if (!this.state.trainings && isLoaded(seasons) && isLoaded(trainings) && !isEmpty(seasons) && !isEmpty(trainings)) {
            const seasonKey = Object.keys(seasons)[0];
            const trainingsForSeason = Object.keys(trainings)
                .filter(key => trainings[key].season === seasonKey)
                .map(key => {
                    return trainings[key]
                });
            this.setState({trainings: trainingsForSeason});
        }
    }

    render() {
        const {seasons, trainings} = this.props;
        const {selected} = this.state;

        if (isLoaded(seasons) && isLoaded(trainings) && !isEmpty(seasons) && !isEmpty(trainings)) {
            return (
                <Grid container justify="center">
                    <Select key="1"
                            input={<Input id="season"/>}
                            value={""}
                    >
                        <MenuItem value="">
                            <em>Keine</em>
                        </MenuItem>
                        {
                            Object.keys(seasons).map((key) => (
                                <MenuItem value={key} key={key}>
                                    {seasons[key].name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <ComponentOrNothing
                        test={this.state.trainings}
                        component={() =>
                            <ComponentOrLoading
                                test={trainings}
                                component={() =>
                                    <TrainingGrid
                                        trainings={trainings}
                                        handleItemClick={this.handleListItemClicked}
                                        handleDelete={this.deleteTraining}
                                        getSelectedClass={this.getSelectedClass}
                                    />
                                }
                            />
                        }
                    />
                    <ComponentOrNothing
                        test={selected}
                        component={() =>
                            <EditTrainingForm
                                onSubmit={this.updateTraining}
                                seasons={seasons}
                            />
                        }
                    />
                </Grid>
            )
        } else {
            return <LoadingSpinner />
        }
    }
}

export const AllTrainings = compose(
    firebaseConnect([`/${TRAINING_LOCATION}`, `/${SEASON_LOCATION}`]),
    connect(
        ({firebase: {auth, data: {trainings, seasons}}}) => ({
            auth,
            trainings,
            seasons
        })
    ),
    withStyles(listStyles),
    withTitle("Training bearbeiten")
)(AllTrainingsComponent);
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
import {TrainingsBySeason} from "./trainings.by.season";

class AllTrainingsComponent extends Component {
    state = {
        selectedSeason: null
    };

    handleChange = event => {
        this.setState({selectedSeason: event.target.value})
    };

    render() {
        const {seasons} = this.props;
        const {selectedSeason} = this.state;

        if (isLoaded(seasons) && !isEmpty(seasons)) {
            return (
                <Grid container justify="center">
                    <Grid container justify="center">
                        <Grid item xs={8} lg={4}>
                            <Select key="1"
                                    input={<Input id="season" style={{width: '100%'}}/>}
                                    value={""}
                                    onChange={(event) => this.handleChange(event)}
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
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} lg={6}>
                            <TrainingsBySeason season={selectedSeason} style={{width: '100%'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else {
            return <LoadingSpinner/>
        }
    }
}

export const AllTrainings = compose(
    firebaseConnect([`/${SEASON_LOCATION}`]),
    connect(
        ({firebase: {auth, data: {seasons}}}) => ({
            auth,
            seasons
        })
    ),
    withStyles(listStyles),
    withTitle("Training bearbeiten")
)(AllTrainingsComponent);
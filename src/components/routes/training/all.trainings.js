import React, {Component} from 'react';
import {PLAYER_LOCATION, SEASON_LOCATION} from "../../constants/api.constants";
import {FormControl, Grid, Input, InputLabel, MenuItem, Select, withStyles} from "material-ui";
import {compose} from "redux";
import {firebaseConnect, isEmpty, isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import {withTitle} from "../../utilities/withTitleHOC";
import {listStyles} from "../../styles";
import {LoadingSpinner} from "../../utilities/loading.spinner";
import {TrainingsBySeason} from "./trainings.by.season";

class AllTrainingsComponent extends Component {
    state = {
        selectedSeason: ""
    };

    handleChange = event => {
        this.setState({selectedSeason: event.target.value})
    };

    render() {
        const {seasons, players} = this.props;
        const {selectedSeason} = this.state;

        if (isLoaded(seasons) && !isEmpty(seasons)) {
            return (
                <Grid container justify="center">
                    <Grid container justify="center">
                        <Grid item xs={8} lg={4}>
                            <FormControl style={{width: '100%'}}>
                                <InputLabel htmlFor="season">Saison</InputLabel>
                                <Select key="1"
                                        input={<Input id="season" style={{width: '100%'}}/>}
                                        value={this.state.selectedSeason}
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
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} lg={6}>
                            <TrainingsBySeason
                                seasons={seasons}
                                players={players}
                                selectedSeasonKey={selectedSeason}
                                style={{width: '100%'}}
                            />
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
        firebaseConnect([`/${SEASON_LOCATION}`, `/${PLAYER_LOCATION}`]),
        connect(
        ({firebase: {auth, data: {seasons, players}}}) => ({
            auth,
            seasons,
            players
        })
        ),
        withStyles(listStyles),
        withTitle("Training bearbeiten")
        )(AllTrainingsComponent);
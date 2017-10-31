import React from 'react';
import {ADD_SEASON_FORM, ADDITIONAL_SEASON, SEASON} from "../../../constants/forms/season.form.constants";
import {SEASON_LOCATION} from "../../../constants/api.constants";
import {reset} from 'redux-form';
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withTitle} from "../../../utilities/withTitleHOC";
import {AddSeasonForm} from "./add.season.form";

class AddSeasonPresentation extends React.Component {
    handleAdd = season => {
        if (this.props.auth) {
            const newSeason = {
                name: season[SEASON]
            };

            this.props.firebase.pushWithMeta(
                `/${SEASON_LOCATION}`,
                newSeason,
                season[ADDITIONAL_SEASON] ? () => {
                    this.props.dispatch(reset(ADD_SEASON_FORM))
                } : () => {
                    this.props.history.push("/")
                }
            )
        }
    };

    render() {
        return <AddSeasonForm onSubmit={this.handleAdd}/>
    }
}

export const AddSeason = compose(
    firebaseConnect(),
    connect(
        ({firebase: {auth}}) => ({
            auth
        })
    ),
    withTitle("Saison hinzufügen"),
    withRouter
)(AddSeasonPresentation);
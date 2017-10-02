import React from 'react';
import {ADD_SEASON_FORM, ADDITIONAL_SEASON, SEASON} from "../../../constants/forms/season.form.constants";
import {SEASON_LOCATION} from "../../../constants/api.constants";
import {reset} from 'redux-form';
import {Heading} from "../../../heading";
import AddSeasonForm from "./add.season.form";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

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
        return [
            <Heading key="0" title="Saison hinzufügen" />,
            <AddSeasonForm key="1" onSubmit={this.handleAdd}/>
        ]
    }
}

const wrappedAddSeason = firebaseConnect()(AddSeasonPresentation);
export const AddSeason = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withRouter(wrappedAddSeason));
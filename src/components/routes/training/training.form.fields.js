import React from 'react';
import {Field} from "redux-form";
import SelectSeasonField from "../../form/select.season.field";
import renderDatePicker from "../../form/material.date.picker.field";
import {SEASON} from "../../constants/forms/season.form.constants";
import {DATE, PLAYERS} from "../../constants/forms/training.form.constants";
import {FormField} from "../../form/form.field";
import PropTypes from 'prop-types';
import {SelectPlayerField} from "../../form/select.player.field";

export const TrainingFormFields = ({seasons, players}) =>
    <div>
        <FormField>
            <Field
                name={SEASON}
                value=''
                component={SelectSeasonField}
                seasons={seasons}
            />
        </FormField>
        <FormField>
            <Field
                name={DATE}
                value="2017-05-24"
                component={renderDatePicker}
                label="Trainingstag"
                style={{width: '100%'}}
            />
        </FormField>
        <FormField>
            <Field
                name={PLAYERS}
                component={SelectPlayerField}
                players={players}
                style={{width: '100%'}}
            />
        </FormField>
    </div>;

TrainingFormFields.propTypes = {
    seasons: PropTypes.object,
    players: PropTypes.object
};
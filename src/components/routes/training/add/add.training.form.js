import React from 'react';
import FormField from "../../../form/form.field";
import {Field, reduxForm} from "redux-form";
import renderDatePicker from "../../../form/material.date.picker.field";
import FormButton from "../../../form/form.button";
import {Button} from "material-ui";
import {SelectPlayerField} from "../../../form/select.player.field";
import {ADD_TRAINING_FORM, DATE, PLAYERS} from "../../../constants/forms/training.form.constants";
import PropTypes from 'prop-types';
import SelectSeasonField from "../../../form/select.season.field";
import {SEASON} from "../../../constants/forms/season.form.constants";

const validate = values => {
    const errors = {};

    if (!values.date) {
        errors.date = 'Ein Datum muss ausgewählt werden'
    }
    if (!values[SEASON]) {
        errors[SEASON] = "Eine Saison muss ausgewählt werden"
    }

    return errors;
};

class AddTrainingFormPresentation extends React.Component {
    render() {
        const {invalid, submitting} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <FormField>
                <Field
                    name={SEASON}
                    value=''
                    component={SelectSeasonField}
                    seasons={this.props.seasons}
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
                    players={this.props.players}
                    style={{width: '100%'}}
                />
            </FormField>
            <FormButton>
                <Button
                    type="submit"
                    disabled={invalid || submitting}
                    raised={true}
                    color="primary"
                >
                    hinzufügen
                </Button>
            </FormButton>
        </form>
    }
}

export const AddTrainingForm = reduxForm({
    form: ADD_TRAINING_FORM,
    validate
})(AddTrainingFormPresentation);

AddTrainingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    seasons: PropTypes.object
};
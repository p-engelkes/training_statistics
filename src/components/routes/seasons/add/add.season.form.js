import React from 'react';
import {ADD_SEASON_FORM, ADDITIONAL_SEASON, SEASON} from "../../../constants/forms/season.form.constants";
import renderTextField from "../../../form/material.text.field";
import {Field, reduxForm} from "redux-form";
import FormButton from "../../../form/form.button";
import {Button} from "material-ui";
import renderCheckBox from "../../../form/material.checkbox.field";
import PropTypes from 'prop-types';
import {FormField} from "../../../form/form.field";

const validate = values => {
    let errors = {};

    if (!values[SEASON]) {
        errors[SEASON] = 'Ein Saisonname muss angegeben werden'
    }

    return errors;
};

let AddSeasonFormUI = ({invalid, submitting, handleSubmit}) =>
    <form onSubmit={handleSubmit}>
        <FormField>
            <Field
                name={SEASON}
                component={renderTextField}
                label="Saison"
                type="text"
                style={{width: '100%'}}
            />
        </FormField>
        <FormButton>
            <Field
                name={ADDITIONAL_SEASON}
                component={renderCheckBox}
                label="Weitere Saison hinzufügen"
            />
            <Button
                type="submit"
                disabled={invalid || submitting}
                raised={true}
                color="primary"
            >
                hinzufügen
            </Button>
        </FormButton>
    </form>;

export const AddSeasonForm = reduxForm({
    form: ADD_SEASON_FORM,
    validate
})(AddSeasonFormUI);

AddSeasonForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
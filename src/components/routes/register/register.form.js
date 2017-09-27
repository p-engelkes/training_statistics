import React from 'react';
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../form/material.text.field";
import {Button, Grid} from "material-ui";
import FormField from "../../form/form.field";
import FormButton from "../../form/form.button";
import {EMAIL, PASSWORD, PASSWORD_CONFIRMATION, REGISTER_FORM} from "../../constants/forms/user.form.constants";
import PropTypes from 'prop-types';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'E-Mail muss eingegeben werden'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Eine gültige E-Mail Adresse muss eingegeben werden'
    }

    if (!values.password) {
        errors.password = 'Passwort muss eingegeben werden'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwörter stimmen nicht überein'
    }

    return errors;
};

let RegisterForm = props => {
    const {handleSubmit, invalid, submitting} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={0}>
                <FormField>
                    <Field
                        name={EMAIL}
                        component={renderTextField}
                        label="E-Mail"
                        type="email"
                        style={{width: '100%'}}
                        key="field"
                    />
                </FormField>
                <FormField>
                    <Field
                        name={PASSWORD}
                        component={renderTextField}
                        label="Passwort"
                        type="password"
                        style={{width: '100%'}}
                        key="field"
                    />
                </FormField>
                <FormField>
                    <Field
                        name={PASSWORD_CONFIRMATION}
                        component={renderTextField}
                        label="Passwort bestätigen"
                        type="password"
                        style={{width: '100%'}}
                        key="field"
                    />
                </FormField>
                <FormButton>
                    <Button
                        raised
                        type="submit"
                        disabled={invalid || submitting}
                        color="primary"
                        key="button"
                    >
                        Registrieren
                    </Button>
                </FormButton>
            </Grid>
        </form>
    )
};

RegisterForm = reduxForm({
    form: REGISTER_FORM,
    validate
})(RegisterForm);

export default RegisterForm

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
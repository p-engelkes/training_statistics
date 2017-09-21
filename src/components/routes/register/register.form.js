import React from 'react';
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../form/material.text.field";
import {Button} from "material-ui";
import FormField from "../../form/form.field";
import FormButton from "../../form/form.button";

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
            <FormField>
                <Field
                    name="email"
                    component={renderTextField}
                    label="E-Mail"
                    type="email"
                    style={{width: '100%'}}
                    key="field"
                />
            </FormField>
            <FormField>
                <Field
                    name="password"
                    component={renderTextField}
                    label="Passwort"
                    type="password"
                    style={{width: '100%'}}
                    key="field"
                />
            </FormField>
            <FormField>
                <Field
                    name="confirmPassword"
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
        </form>
    )
};

RegisterForm = reduxForm({
    form: 'RegisterForm',
    validate
})(RegisterForm);

export default RegisterForm
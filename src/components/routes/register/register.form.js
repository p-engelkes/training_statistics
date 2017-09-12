import React from 'react';
import {Field, reduxForm, formValueSelector} from "redux-form";
import renderTextField from "../../form/material.text.field";
import {Button} from "material-ui";

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
            <div>
                <Field
                    name="email"
                    component={renderTextField}
                    label="E-Mail"
                    type="email"
                />
            </div>
            <div>
                <Field
                    name="password"
                    component={renderTextField}
                    label="Passwort"
                    type="password"
                />
            </div>
            <div>
                <Field
                    name="confirmPassword"
                    component={renderTextField}
                    label="Passwort bestätigen"
                    type="password"
                />
            </div>
            <div>
                <Button
                    raised
                    type="submit"
                    disabled={invalid || submitting}
                    color="primary"
                >
                    Registrieren
                </Button>
            </div>
        </form>
    )
};

RegisterForm = reduxForm({
   form: 'RegisterForm',
    validate
})(RegisterForm);

export default RegisterForm
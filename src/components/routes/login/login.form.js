import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Button} from "material-ui";
import {validEmail} from '../../../utils/forms'
import renderTextField from "../../form/material.text.field";

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Eine E-Mail Adresse muss eingegeben werden'
    } else if (!validEmail(values.email)) {
        errors.email = 'Eine gülte E-Mail Adresse muss eingegeben werden'
    }

    if (!values.password) {
        errors.password = 'Ein Passwort muss eingegeben werden'
    }

    return errors;
};

const LoginFormUI = props => {
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
                <Button
                    type="submit"
                    disabled={invalid || submitting}
                    raised={true}
                    color={'primary'}
                >Login</Button>
            </div>

        </form>
    )
};

export const LoginForm = reduxForm({
    form: 'LoginForm',
    validate
})(LoginFormUI);
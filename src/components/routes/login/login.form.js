import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Button} from "material-ui";
import {validEmail} from '../../../utils/forms'
import renderTextField from "../../form/material.text.field";
import FormField from "../../form/form.field";
import FormButton from "../../form/form.button";
import {EMAIL, LOGIN_FORM, PASSWORD} from "../../constants/forms/user.form.constants";
import PropTypes from 'prop-types';

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

const LoginFormPresentation = props => {
    const {handleSubmit, invalid, submitting} = props;
    return (
        <form onSubmit={handleSubmit}>
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
            <FormButton>
                <Button
                    type="submit"
                    disabled={invalid || submitting}
                    raised={true}
                    color={'primary'}
                    key="button"
                >Login</Button>
            </FormButton>
        </form>
    )
};

export const LoginForm = reduxForm({
    form: LOGIN_FORM,
    validate
})(LoginFormPresentation);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};


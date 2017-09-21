import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Button, Checkbox} from "material-ui";
import {validEmail} from '../../../utils/forms'
import renderTextField from "../../form/material.text.field";
import FormField from "../../form/form.field";
import FormButton from "../../form/form.button";
import {FormControlLabel} from "../../../../node_modules/material-ui/Form/index";

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
    form: 'LoginForm',
    validate
})(LoginFormUI);
import React from 'react';
import {FormTemplate} from "../../form/form.template";
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../form/material.text.field";
import {Button} from "material-ui";

const PlayerFormUI = props => {
    const {invalid, submitting} = props;

    return <form onSubmit={props.handleSubmit}>
        <FormTemplate title="Spieler hinzufügen">
            <Field
                name="firstName"
                component={renderTextField}
                label="Vorname"
                type="text"
                style={{width: '100%'}}
                key="field"
            />
            <Field
                name="lastName"
                component={renderTextField}
                label="Nachname"
                type="text"
                style={{width: '100%'}}
                key="field"
            />
            <Button
                type="submit"
                disabled={invalid || submitting}
                raised={true}
                color="primary"
                key="button"
            >
                hinzufügen
            </Button>
        </FormTemplate>
    </form>
};

export const PlayerForm = reduxForm({
    form: 'PlayerForm'
})(PlayerFormUI);
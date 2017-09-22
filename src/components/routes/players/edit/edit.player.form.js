import React from 'react';
import FormField from "../../../form/form.field";
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../../form/material.text.field";
import FormButton from "../../../form/form.button";
import {Button} from "material-ui";
import {validatePlayerForm} from "../player.form.validation";

class EditPlayerFormPresentation extends React.Component {
    render() {
        const {invalid, submitting} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <FormField>
                <Field
                    name="firstName"
                    component={renderTextField}
                    label="Vorname"
                    type="text"
                    style={{width: '100%'}}
                />
            </FormField>
            <FormField>
                <Field
                    name="lastName"
                    component={renderTextField}
                    label="Nachname"
                    type="text"
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
                    aktualisieren
                </Button>
            </FormButton>
        </form>
    }
}

export const EditPlayerForm = reduxForm({
    form: 'EditPlayerForm',
    validatePlayerForm
})(EditPlayerFormPresentation);
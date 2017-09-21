import React from 'react';
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../form/material.text.field";
import {Button, Checkbox} from "material-ui";
import FormField from "../../form/form.field";
import FormButton from "../../form/form.button";
import {FormControlLabel} from "../../../../node_modules/material-ui/Form/index";
import renderCheckBox from "../../form/material.checkbox.field";

class PlayerFormPresentation extends React.Component {
    render() {
        const {invalid, submitting, title, buttonLabel} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <FormField>
                <Field
                    name="firstName"
                    component={renderTextField}
                    label="Vorname"
                    type="text"
                    style={{width: '100%'}}
                    key="field"
                />
            </FormField>
            <FormField>
                <Field
                    name="lastName"
                    component={renderTextField}
                    label="Nachname"
                    type="text"
                    style={{width: '100%'}}
                    key="field"
                />
            </FormField>
            <FormButton>
                <Field
                    name="aditionalPlayer"
                    component={renderCheckBox}
                    label="weiteren Spieler hinzufügen"
                />
                <Button
                    type="submit"
                    disabled={invalid || submitting}
                    raised={true}
                    color="primary"
                    key="button"
                >
                    {buttonLabel}
                </Button>
            </FormButton>

        </form>
    }
}

export const PlayerForm = reduxForm({
    form: 'PlayerForm'
})(PlayerFormPresentation);
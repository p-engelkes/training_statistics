import React from 'react';
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../../form/material.text.field";
import {Button} from "material-ui";
import FormField from "../../../form/form.field";
import FormButton from "../../../form/form.button";
import renderCheckBox from "../../../form/material.checkbox.field";
import {Heading} from "../../../heading";
import {withRouter} from "react-router-dom";

class AddPlayerFormPresentation extends React.Component {
    render() {
        const {invalid, submitting, buttonLabel} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <Heading title="Spieler hinzufügen"/>
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
                    name="additionalPlayer"
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

export const AddPlayerForm = reduxForm({
    form: 'AddPlayerForm'
})(withRouter(AddPlayerFormPresentation));
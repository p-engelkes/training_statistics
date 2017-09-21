import React from 'react';
import {FormTemplate} from "../../form/form.template";
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../form/material.text.field";
import {Button} from "material-ui";

class PlayerFormPresentation  extends React.Component{
    render() {
        const {invalid, submitting, title, buttonLabel} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <FormTemplate title={title}>
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
                    {buttonLabel}
                </Button>
            </FormTemplate>
        </form>
    }
}

export const PlayerForm = reduxForm({
    form: 'PlayerForm'
})(PlayerFormPresentation);
import React from 'react';
import {FormTemplate} from "../../form/form.template";
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../form/material.text.field";
import {Button} from "material-ui";

class PlayerFormUI  extends React.Component{
    componentDidUpdate() {
        const {player} = this.props;
        if (player) {
            this.props.change('firstName', player.firstName);
            this.props.change('lastName', player.lastName);
        }
    }

    render() {
        const {invalid, submitting} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <FormTemplate title="aktualisieren">
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
                    {
                        this.props.player ?
                            "aktualisieren":
                            "hinzufügen"
                    }
                </Button>
            </FormTemplate>
        </form>
    }
}

export const PlayerForm = reduxForm({
    form: 'PlayerForm'
})(PlayerFormUI);
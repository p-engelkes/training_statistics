import React from 'react';
import {Heading} from "../../../heading";
import FormField from "../../../form/form.field";
import {Field, reduxForm} from "redux-form";
import renderDatePicker from "../../../form/material.date.picker.field";
import FormButton from "../../../form/form.button";
import {Button} from "material-ui";
import {SelectPlayerField} from "../../../form/select.player.field";

const validate = values => {
    const errors = {}

    if (!values.date) {
        errors.date = 'Ein Datum muss ausgewählt werden'
    }

    return errors;
};

class AddTrainingFormPresentation extends React.Component {
    render() {
        const {invalid, submitting} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <Heading title="Training hinzufügen" />
            <FormField>
                <Field
                    name="date"
                    value="2017-05-24"
                    component={renderDatePicker}
                    label="Trainingstag"
                    style={{width: '100%'}}
                />
            </FormField>
            <FormField>
                <Field
                    name="players"
                    component={SelectPlayerField}
                    players={this.props.players}
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
                    hinzufügen
                </Button>
            </FormButton>
        </form>
    }
}

export const AddTrainingForm = reduxForm({
    form: 'AddTrainingForm',
    validate
})(AddTrainingFormPresentation);
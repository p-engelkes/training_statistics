import React, {Component} from 'react';
import {TrainingFormFields} from "../training.form.fields";
import FormButton from "../../../form/form.button";
import {Button} from "material-ui";
import {reduxForm} from "redux-form";
import {EDIT_TRAINING_FORM} from "../../../constants/forms/training.form.constants";
import {validateTraining} from "../training.form.validation";
import PropTypes from 'prop-types';

class EditTrainingFormUI extends Component {
    render() {
        const {invalid, submitting} = this.props;

        return (
            <form onSubmit={this.props.handleSubmit}>
                <TrainingFormFields />
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
        )
    }
}

export const EditTrainingForm = reduxForm({
    form: EDIT_TRAINING_FORM,
    validateTraining
})(EditTrainingFormUI);

EditTrainingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    seasons: PropTypes.object
};
import React from 'react';
import {reduxForm} from "redux-form";
import FormButton from "../../../form/form.button";
import {Button} from "material-ui";
import {ADD_TRAINING_FORM} from "../../../constants/forms/training.form.constants";
import PropTypes from 'prop-types';
import {TrainingFormFields} from "../training.form.fields";
import {validateTraining} from "../training.form.validation";

class AddTrainingFormPresentation extends React.Component {
    render() {
        const {invalid, submitting} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <TrainingFormFields seasons={this.props.seasons} />
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
    form: ADD_TRAINING_FORM,
    validateTraining
})(AddTrainingFormPresentation);

AddTrainingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    seasons: PropTypes.object
};
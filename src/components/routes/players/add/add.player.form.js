import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Button} from "material-ui";
import FormButton from "../../../form/form.button";
import renderCheckBox from "../../../form/material.checkbox.field";
import {withRouter} from "react-router-dom";
import {validatePlayerForm} from "../player.form.validation";
import {
    ADD_PLAYER_FORM, ADDITIONAL_PLAYER
} from "../../../constants/forms/player.form.constants";
import {PlayerFormFields} from "../player.form.fields";
import PropTypes from 'prop-types';

class AddPlayerFormPresentation extends React.Component {
    render() {
        const {invalid, submitting} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
            <PlayerFormFields />
            <FormButton>
                <Field
                    name={ADDITIONAL_PLAYER}
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
                    hinzufügen
                </Button>
            </FormButton>
        </form>
    }
}

export const AddPlayerForm = reduxForm({
    form: ADD_PLAYER_FORM,
    validatePlayerForm
})(AddPlayerFormPresentation);

AddPlayerForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
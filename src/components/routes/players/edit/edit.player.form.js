import React from 'react';
import {reduxForm} from "redux-form";
import FormButton from "../../../form/form.button";
import {Button} from "material-ui";
import {validatePlayerForm} from "../player.form.validation";
import {PlayerFormFields} from "../player.form.fields";
import {EDIT_PLAYER_FORM} from "../../../constants/forms/player.form.constants";

class EditPlayerFormPresentation extends React.Component {
    render() {
        const {invalid, submitting} = this.props;

        return <form onSubmit={this.props.handleSubmit}>
           <PlayerFormFields />
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
    form: EDIT_PLAYER_FORM,
    validatePlayerForm
})(EditPlayerFormPresentation);
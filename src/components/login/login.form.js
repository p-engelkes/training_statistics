import * as React from 'react';
import {Field, reduxForm} from "redux-form";
import {Button} from "material-ui";
import { required } from '../../utils/forms'
import renderTextField from "../form/material.text.field";


const LoginFormUI = props => {
    const {handleSubmit, invalid, submitting} = props;
    console.log(props);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="userName"
                    component={renderTextField}
                    label="Benutzername"
                    type="text"
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    name="password"
                    component={renderTextField}
                    label="Passwort"
                    type="password"
                    validate={[required]}
                />
            </div>
            <div>
                <Button
                    type="submit"
                    disabled={invalid || submitting}
                    raised={true}
                    color={'primary'}
                >Login</Button>
            </div>

        </form>
    )
};

export const LoginForm = reduxForm({
    form: 'LoginForm'
})(LoginFormUI);
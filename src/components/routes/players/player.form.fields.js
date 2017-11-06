import React from 'react';
import renderTextField from "../../form/material.text.field";
import {Field} from "redux-form";
import {FIRST_NAME, LAST_NAME} from "../../constants/forms/player.form.constants";
import {FormField} from "../../form/form.field";

export const PlayerFormFields = () => <div>
    <FormField>
        <Field
            name={FIRST_NAME}
            component={renderTextField}
            label="Vorname"
            type="text"
            style={{width: '100%'}}
            key="field"
        />
    </FormField>
    <FormField>
        <Field
            name={LAST_NAME}
            component={renderTextField}
            label="Nachname"
            type="text"
            style={{width: '100%'}}
            key="field"
        />
    </FormField>
</div>;
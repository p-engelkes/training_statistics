import * as React from 'react';
import FormField from "./form.field";
import FormButton from "./form.button";
import {Heading} from "../heading";

export const FormTemplate = ({title, children}) => {
    function renderFormFields() {
        return getFormFields().map((formField, index) => {
            return <FormField key={index}>
                {formField}
            </FormField>
        })
    }

    function getFormFields() {
        return children.filter(child => {
            return child.key === 'field'
        })
    }

    function getButton() {
        return children.filter(child => {
            return child.key === 'button'
        })
    }

    return <div>
        {
            title &&
            <Heading title={title}/>
        }
        {renderFormFields()}
        <FormButton>
            {getButton()}
        </FormButton>
    </div>
};
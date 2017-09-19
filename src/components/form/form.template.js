import * as React from 'react';
import FormField from "./form.field";
import FormButton from "./form.button";

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
        <div className="row center-xs">
            <div className="col-sx-2">
                <h1>{title}</h1>
            </div>
        </div>
        {renderFormFields()}
        <FormButton>
            {getButton()}
        </FormButton>
    </div>
};
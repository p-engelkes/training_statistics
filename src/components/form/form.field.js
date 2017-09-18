import React from 'react';

const FormField = ({children}) => {
    return (
        <div className="row">
            <div className="col-lg-offset-3 col-lg-6 col-xs-12">
                {children}
            </div>
        </div>
    )
};

export default FormField;
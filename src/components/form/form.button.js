import React from 'react';

const FormButton = ({children}) => {
    return (
        <div className="row" style={{marginTop: 20}}>
            <div className="col-lg-offset-9 col-xs-offset-10">
                {children}
            </div>
        </div>
    )
};

export default FormButton;
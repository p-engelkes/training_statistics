import React from 'react';

const FormButton = ({children}) => {
    return (
        <div className="row middle-lg" style={{marginTop: 20}}>
            <div className="col-lg-offset-7 col-xs-offset-10">
                {children}
            </div>
        </div>
    )
};

export default FormButton;
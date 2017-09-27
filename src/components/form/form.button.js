import React from 'react';
import {Grid} from "material-ui";

const FormButton = ({children}) => {
    return (
        <Grid container justify="flex-end">
            <Grid item style={{paddingTop: 20}}>
                {children}
            </Grid>
        </Grid>
    )
};

export default FormButton;
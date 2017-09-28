import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Grid} from "material-ui";

const styles = theme => ({
    padding: {
        paddingBottom: 10
    }
});

const FormField = ({children, classes}) => {
    return (
        <Grid container justify="center" className={classes.padding}>
            <Grid item xs={12} lg={8}>
                {children}
            </Grid>
        </Grid>
    )
};

export default withStyles(styles)(FormField);
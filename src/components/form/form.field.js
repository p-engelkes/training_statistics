import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    padding: {
        paddingBottom: 10
    }
});

const FormField = ({children, classes}) => {
    return (
        <div className={`row ${classes.padding}`}>
            <div className="col-lg-offset-3 col-lg-6 col-xs-12">
                {children}
            </div>
        </div>
    )
};

export default withStyles(styles)(FormField);
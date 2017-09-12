import React from 'react';
import {TextField} from "material-ui";

const renderTextField = ({
                             input,
                             label,
                             meta: {touched, error, invalid},
                             ...custom
                         }) =>
    <TextField
        error={touched && invalid}
        label={label}
        helperText={touched && invalid && error}
        {...input}
        {...custom}
    />;

export default renderTextField
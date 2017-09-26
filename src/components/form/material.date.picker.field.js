import TextField from "../../../node_modules/material-ui/TextField/TextField";
import * as React from "react";

const renderDatePicker = ({
                              input,
                              label,
                              meta: {touched, error, invalid},
                              ...custom
                          }) => {
    return <TextField
        error={touched && invalid}
        label={label}
        type="date"
        InputLabelProps={{
            shrink: true
        }}
        {...input}
        {...custom}
    />;
};


export default renderDatePicker
import React from 'react';
import {Checkbox} from "material-ui";
import {FormControlLabel} from "../../../node_modules/material-ui/Form/index";

const renderCheckBox = ({
                            label, input
                        }) =>
    <FormControlLabel
        control={
            <Checkbox
                checked={input.value}
                onChange={input.onChange}
            />
        }
        label={label}
    />;

export default renderCheckBox
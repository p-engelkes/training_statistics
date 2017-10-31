import * as React from "react";
import {CircularProgress} from "../../../node_modules/material-ui/Progress/index";
import {Grid} from "material-ui";

export const LoadingSpinner = () =>
    <Grid container justify="center">
        <Grid item>
            <CircularProgress size={50}/>
        </Grid>
    </Grid>;
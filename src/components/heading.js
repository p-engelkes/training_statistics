import React from 'react';
import {Grid} from "material-ui";

export const Heading = ({title}) =>
    <Grid container justify="center">
        <Grid item>
            <h1>{title}</h1>
        </Grid>
    </Grid>;

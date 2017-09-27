import React from 'react';
import {Grid} from "material-ui";
import PropTypes from 'prop-types';

export const Heading = ({title}) =>
    <Grid container justify="center">
        <Grid item>
            <h1>{title}</h1>
        </Grid>
    </Grid>;

Heading.propTypes = {
      title: PropTypes.string.isRequired
};
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LoadingSpinner} from "./loading.spinner";

export default class ComponentOrLoading extends Component {
    render() {
        if (this.props.test) {
            return this.props.component()
        } else {
            return <LoadingSpinner />
        }
    }
}

ComponentOrLoading.propTypes = {
    test: PropTypes.object,
    component: PropTypes.func.isRequired
};
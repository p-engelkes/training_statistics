import {Component} from 'react';
import PropTypes from 'prop-types';

export default class ComponentOrNothing extends Component {
    render() {
        if (this.props.test) {
            return this.props.component();
        } else {
            return null;
        }
    }
}

ComponentOrNothing.propTypes = {
    test: PropTypes.object,
    component: PropTypes.func.isRequired
};
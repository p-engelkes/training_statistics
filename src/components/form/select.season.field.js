import React from 'react';
import PropTypes from 'prop-types';
import {InputLabel} from "../../../node_modules/material-ui/Input/index";
import {Input, Select} from "material-ui";
import {MenuItem} from "../../../node_modules/material-ui/Menu/index";
import {isLoaded, isEmpty} from 'react-redux-firebase';
import {LoadingSpinner} from "../loading.spinner";
import {FormControl} from "../../../node_modules/material-ui/Form/index";

export default class SelectSeasonField extends React.Component {
    state = {
        value: this.props.value ? this.props.value : ''
    };

    updateValue = (event) => {
        this.setState(previousState => {
            return {value: event.target.value}
        }, () => {
            this.props.input.onChange(this.state.value)
        })
    };

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.input.value})
    }

    render() {
        const {seasons} = this.props;

        if (isLoaded(seasons) && !isEmpty(seasons)) {
            return <FormControl style={{width: '100%'}}>
                <InputLabel key="0" htmlFor="season">Saison</InputLabel>
                <Select key="1"
                        input={<Input id="season"/>}
                        value={this.state.value}
                        onChange={this.updateValue}
                >
                    <MenuItem value="">
                        <em>Keine</em>
                    </MenuItem>
                    {
                        Object.keys(seasons).map((key) => (
                            <MenuItem value={key} key={key}>
                                {seasons[key].name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        } else {
            return <LoadingSpinner />
        }
    }
}

SelectSeasonField.propTypes = {
    seasons: PropTypes.object
};
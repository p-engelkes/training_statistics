import React from 'react';
import {List} from "material-ui";
import {ListItem, ListItemText} from "../../../node_modules/material-ui/List/index";
import {withStyles} from 'material-ui/styles';
import {isLoaded, isEmpty} from "react-redux-firebase";
import {LoadingSpinner} from "../loading.spinner";

const fieldLabel = {
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 1,
    fontSize: 12,
    fontFamily: 'Roboto'
};

const styles = theme => ({
    selected: {
        background: theme.palette.secondary[300]
    },
    fieldLabel
});


class SelectPlayerFieldPresentation extends React.Component {
    state = {
        value: this.props.value
    };

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.input.value})
    };

    updateValue(key) {
        const indexOfKey = this.state.value ? this.state.value.indexOf(key) : -1;
        if (indexOfKey === -1) {
            this.setState(previousState => {
                if (previousState.value) {
                    previousState.value.push(key);
                    return {value: previousState.value}
                }

                previousState.value = [];
                previousState.value.push(key);
                return {value: previousState.value}
            }, () => {
                this.props.input.onChange(this.state.value);
            });
        } else {
            this.setState(previousState => {
                previousState.value.splice(indexOfKey, 1)
            }, () => {
                this.props.input.onChange(this.state.value)
            })
        }
    }

    getSelectedClass(key) {
        const {value} = this.state;
        const {classes} = this.props;

        if (value && value.indexOf(key) !== -1) {
            return classes.selected
        }

        return '';
    }

    render() {
        const {players, classes} = this.props;

        if (isLoaded(players) && !isEmpty(players)) {
            return <div>
                <div className={classes.fieldLabel}>Trainingstag</div>

                <List>
                    {
                        Object.keys(players).map((key) => (
                            <ListItem key={key} dense button
                                      onClick={() => this.updateValue(key)}
                                      className={this.getSelectedClass(key)}
                            >
                                <ListItemText primary={`${players[key].firstName} ${players[key].lastName}`}/>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        } else {
            return <LoadingSpinner />
        }
    }
}

export const SelectPlayerField = withStyles(styles)(SelectPlayerFieldPresentation);
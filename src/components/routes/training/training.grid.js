import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';

export default class TrainingGrid extends Component {
    render() {
        const {trainings} = this.props;

        return (
            <Grid item xs={12} lg={6}>
                <List>
                    {
                        Object.keys(this.props.trainings).map(key => (
                            <ListItem
                                key={key}
                                dense
                                button
                                onClick={() => this.props.handleItemClick({
                                    training: trainings[key],
                                    key
                                })}
                                className={this.props.getSelectedClass(key)}
                            >
                                <ListItemText primary={`${trainings[key].date}`}/>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={() => this.props.handleDelete(key)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        )
    }
}

TrainingGrid.propTypes = {
    trainings: PropTypes.object.isRequired,
    handleItemClick: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    getSelectedClass: PropTypes.func.isRequired
};
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import {EditTrainingForm} from "./edit/edit.training.form";

export default class TrainingGrid extends Component {
    state = {
        selected: null
    };

    handleItemClick = training => {
        this.setState({selected: training});
        this.props.handleItemClick(training);
    };

    render() {
        const {trainings, seasons, players} = this.props;

        return (
            <List>
                {
                    Object.keys(this.props.trainings).map(key => (
                        <ListItem
                            key={key}
                            dense
                            button
                            onClick={() => this.handleItemClick({
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
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
                {
                    this.state.selected && (
                        <EditTrainingForm
                            onSubmit={this.props.handleUpdate}
                            seasons={seasons}
                            players={players}
                        />
                    )
                }
            </List>
        )
    }
}

TrainingGrid.propTypes = {
    trainings: PropTypes.object.isRequired,
    seasons: PropTypes.object,
    players: PropTypes.object,
    handleUpdate: PropTypes.func.isRequired,
    handleItemClick: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    getSelectedClass: PropTypes.func.isRequired
};
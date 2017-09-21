import React, {Component} from 'react';
import {PlayerForm} from "./player.form";
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import {reset, change} from 'redux-form';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui/List";
import {IconButton} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import {CircularProgress} from "../../../../node_modules/material-ui/Progress/index";
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    selectedPlayer: {
        background: theme.palette.grey[100]
    }
});

class PlayerPresentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlayer: null
        }
    }

    handleUpdate = player => {
        if (this.props.auth) {
            this.props.firebase.updateWithMeta(`/players/${player.key}`, player)
        }
    };

    handleDelete = key => {
        if (this.props.auth) {
            this.props.firebase.remove(`/players/${key}`).catch(err => {
                console.log(err)
            });
            if (this.state.selectedPlayer) {
                this.setState({selectedPlayer: null})
            }
        }
    };

    handleListItemClicked = player => {
        this.setState({selectedPlayer: player});
        this.props.dispatch(change('PlayerForm', 'firstName', player.firstName));
        this.props.dispatch(change('PlayerForm', 'lastName', player.lastName));
    };

    render() {
        const {players} = this.props;
        const {classes} = this.props.classes;

        return <div>
            {
                isLoaded(this.props.players) && !isEmpty(this.props.players) ?
                    <div className="col-lg-offset-4 col-lg-4 col-xs-12">
                        <List>
                            {
                                Object.keys(players).map((key) => (
                                    <ListItem key={key} dense button
                                              onClick={() => this.handleListItemClicked(players[key])}
                                    >
                                        <ListItemText primary={`${players[key].firstName} ${players[key].lastName}`}/>
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Delete" onClick={() => this.handleDelete(key)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div> :
                    <div className="row center-xs">
                        <div className="col-sx-2">
                            <CircularProgress size={50}/>
                        </div>
                    </div>
            }
            {
                this.state.selectedPlayer &&
                <PlayerForm onSubmit={this.handleUpdate}
                            player={this.state.selectedPlayer}
                            title=""
                            buttonLabel="aktualisieren"
                />
            }
        </div>
    }
}

const wrappedPlayer = firebaseConnect(['/players'])(PlayerPresentation);
export const Player = withStyles(styles)(connect(
    ({firebase: {auth, data: {players}}}) => ({
        auth,
        players
    })
)(wrappedPlayer));
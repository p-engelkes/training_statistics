import React, {Component} from 'react';
import {AddPlayerForm} from "./add/add.player.form";
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import {change} from 'redux-form';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui/List";
import {IconButton} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import {CircularProgress} from "../../../../node_modules/material-ui/Progress/index";
import {withStyles} from 'material-ui/styles';
import {Heading} from "../../heading";
import {EditPlayerForm} from "./edit/edit.player.form";

const styles = theme => ({
    selected: {
        background: theme.palette.secondary[300]
    }
});

class PlayerPresentation extends Component {
    state = {
        selected: null
    };

    handleUpdate = player => {
        if (this.props.auth) {
            this.props.firebase.updateWithMeta(`/players/${this.state.selected.key}`, player)
        }
    };

    handleDelete = key => {
        if (this.props.auth) {
            this.props.firebase.remove(`/players/${key}`).catch(err => {
                console.log(err)
            });
            if (this.state.selected) {
                this.setState({selected: null})
            }
        }
    };

    handleListItemClicked = selected => {
        this.setState({selected});
        this.props.dispatch(change('EditPlayerForm', 'firstName', selected.player.firstName));
        this.props.dispatch(change('EditPlayerForm', 'lastName', selected.player.lastName));
    };

    getSelectedClass(key) {
        const {selected} = this.state;
        const {classes} = this.props;

        if (selected) {
            if (key === selected.key) {
                return classes.selected
            }
        }

        return ''
    }

    render() {
        const {players} = this.props;

        return <div>
            <Heading title="Spielerübersicht"/>
            {
                isLoaded(this.props.players) && !isEmpty(this.props.players) ?
                    <div className="col-lg-offset-4 col-lg-4 col-xs-12">
                        <List>
                            {
                                Object.keys(players).map((key) => (
                                    <ListItem key={key} dense button
                                              onClick={() => this.handleListItemClicked({
                                                  player: players[key],
                                                  key
                                              })}
                                              className={this.getSelectedClass(key)}
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
                this.state.selected &&
                <EditPlayerForm onSubmit={this.handleUpdate}
                                player={this.state.selected}
                                title=""
                                buttonLabel="aktualisieren"
                />
            }
        </div>
    }
}

const wrappedPlayer = firebaseConnect(['/players'])(PlayerPresentation);
export const Player = (connect(
    ({firebase: {auth, data: {players}}}) => ({
        auth,
        players
    })
)(withStyles(styles)(wrappedPlayer)));
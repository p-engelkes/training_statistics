import React, {Component} from 'react';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import {change} from 'redux-form';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui/List";
import {Grid, IconButton} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';
import {withStyles} from 'material-ui/styles';
import {Heading} from "../../heading";
import {EditPlayerForm} from "./edit/edit.player.form";
import {LoadingSpinner} from "../../loading.spinner";
import {EDIT_PLAYER_FORM, FIRST_NAME, LAST_NAME} from "../../constants/forms/player.form.constants";
import {PLAYER_LOCATION} from "../../constants/api.constants";

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
            this.props.firebase.updateWithMeta(`/${PLAYER_LOCATION}/${this.state.selected.key}`, player)
        }
    };

    handleDelete = key => {
        if (this.props.auth) {
            this.props.firebase.remove(`/${PLAYER_LOCATION}/${key}`).catch(err => {
                console.log(err)
            });
            if (this.state.selected) {
                this.setState({selected: null})
            }
        }
    };

    handleListItemClicked = selected => {
        this.setState({selected});
        this.props.dispatch(change(EDIT_PLAYER_FORM, FIRST_NAME, selected.player.firstName));
        this.props.dispatch(change(EDIT_PLAYER_FORM, LAST_NAME, selected.player.lastName));
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

        return <Grid container justify="center">
            <Heading title="Spielerübersicht"/>
            {
                isLoaded(this.props.players) && !isEmpty(this.props.players) ?
                    <Grid item xs={12} lg={6}>
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
                    </Grid> :
                        <LoadingSpinner />
            }
            {
                this.state.selected &&
                <EditPlayerForm onSubmit={this.handleUpdate}
                                player={this.state.selected}
                                title=""
                                buttonLabel="aktualisieren"
                />
            }
        </Grid>
    }
}

const wrappedPlayer = firebaseConnect([`/${PLAYER_LOCATION}`])(PlayerPresentation);
export const Player = (connect(
    ({firebase: {auth, data: {players}}}) => ({
        auth,
        players
    })
)(withStyles(styles)(wrappedPlayer)));
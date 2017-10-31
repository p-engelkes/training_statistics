import React, {Component} from 'react';
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {change} from 'redux-form';
import {Grid} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {EditPlayerForm} from "./edit/edit.player.form";
import {EDIT_PLAYER_FORM, FIRST_NAME, LAST_NAME} from "../../constants/forms/player.form.constants";
import {PLAYER_LOCATION} from "../../constants/api.constants";
import {withTitle} from "../../utilities/withTitleHOC";
import {compose} from "redux";
import ComponentOrLoading from "../../utilities/component.or.loading";
import PlayerGrid from "./player.grid";
import ComponentOrNothing from "../../utilities/component.or.nothing";

const styles = theme => ({
    selected: {
        background: theme.palette.secondary[300]
    }
});

class PlayerListComponent extends Component {
    state = {
        selected: null
    };

    /**
     *
     * @param player to update with the nw properties
     */
    updatePlayer = player => {
        if (this.props.auth) {
            this.props.firebase.updateWithMeta(`/${PLAYER_LOCATION}/${this.state.selected.key}`, player)
        }
    };

    /**
     *
     * @param key of the given player to delete
     */
    deletePlayer = key => {
        if (this.props.auth) {
            this.props.firebase.remove(`/${PLAYER_LOCATION}/${key}`).catch(err => {
                console.log(err)
            });
            if (this.state.selected) {
                this.setState({selected: null})
            }
        }
    };

    /**
     * Sets the state to the selected player and its key
     * @param selected object which contains the player object and the key string
     */
    handleListItemClicked = selected => {
        this.setState({selected});
        this.props.dispatch(change(EDIT_PLAYER_FORM, FIRST_NAME, selected.player.firstName));
        this.props.dispatch(change(EDIT_PLAYER_FORM, LAST_NAME, selected.player.lastName));
    };

    /**
     * If the player is selected the background is highlighted with the accent color else null is returned
     * @param key of the player
     * @returns {string} className for this player
     */
    getSelectedClass = key => {
        const {selected} = this.state;
        const {classes} = this.props;

        if (selected) {
            if (key === selected.key) {
                return classes.selected
            }
        }

        return ''
    };

    render() {
        const {players} = this.props;
        const {selected} = this.state;

        return (
            <Grid container justify="center">
                <ComponentOrLoading
                    test={players}
                    component={() =>
                        <PlayerGrid
                            players={players}
                            handleItemClick={this.handleListItemClicked}
                            handleDelete={this.deletePlayer}
                            getSelectedClass={this.getSelectedClass}
                        />
                    }
                />
                <ComponentOrNothing
                    test={selected}
                    component={() =>
                        <EditPlayerForm onSubmit={this.updatePlayer}
                                        player={selected}
                                        title=""
                                        buttonLabel="aktualisieren"
                        />
                    }
                />
            </Grid>
        )
    }
}

export const PlayerList = compose(
    firebaseConnect([`/${PLAYER_LOCATION}`]),
    connect(
        ({firebase: {auth, data: {players}}}) => ({
            auth,
            players
        })
    ),
    withStyles(styles),
    withTitle("Spielerübersicht")
)(PlayerListComponent);
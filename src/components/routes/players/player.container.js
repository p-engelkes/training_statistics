import React, {Component} from 'react';
import {PlayerForm} from "./player.form";
import {firebaseConnect, isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import {reset} from 'redux-form';
import {Paper} from "material-ui";
import {Typography} from "../../../../node_modules/material-ui/index";

class PlayerPresentation extends Component {
    handleAdd = newPlayer => {
        if (this.props.auth) {
            this.props.firebase.pushWithMeta('/players', newPlayer);
            this.props.dispatch(reset('PlayerForm'))
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
    }

    render() {
        const {players} = this.props;

        return <div>
            {
                isLoaded(this.props.players) &&
                <div>
                    {
                        Object.keys(players).map((key) => (
                            <Paper elevation={4} key={key} style={{paddingBottom: 5}}>
                                <Typography type="headline" component="h3">
                                    {`${players[key].firstName} ${players[key].lastName}`}
                                </Typography>
                            </Paper>
                        ))
                    }
                </div>
            }
            <PlayerForm onSubmit={this.handleAdd}/>
        </div>
    }
}

const wrappedPlayer = firebaseConnect(['/players'])(PlayerPresentation);
export const Player = connect(
    ({firebase: {auth, data: {players}}}) => ({
        auth,
        players
    })
)(wrappedPlayer);
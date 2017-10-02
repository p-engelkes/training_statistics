import React from 'react'
import Divider from 'material-ui/Divider'
import Collapse from 'material-ui/transitions/Collapse'
import {ListItem, ListItemText} from "../../../node_modules/material-ui/List/index";
import {ExpandLess, ExpandMore} from "material-ui-icons";
import {firebaseConnect, isEmpty, isLoaded} from "react-redux-firebase";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    ADD_PLAYER_ROUTE, ADD_SEASONS_ROUTE, ADD_TRAINING_ROUTE, LOGIN_ROUTE, PLAYERS_ROUTE,
    REGISTER_ROUTE
} from "../../router";


class DrawerMenuItemPresentation extends React.Component {
    state = {
        playersMenuOpen: false,
        trainingMenuOpen: false,
        seasonMenuOpen: false
    };

    handlePlayerMenuClick = () => {
        this.setState({playersMenuOpen: !this.state.playersMenuOpen});
    };

    handleTrainingMenuClick = () => {
        this.setState({trainingMenuOpen: !this.state.trainingMenuOpen});
    };

    handleSeasonMenuClick = () => {
        this.setState({seasonMenuOpen: !this.state.seasonMenuOpen})
    };

    handleLogout = () => {
        this.props.firebase.logout();
    };

    moveTo = (route) => {
        this.props.history.push(route);
        this.props.closeDrawer();
    };

    render() {
        return <div>
            <Divider />
            {
                isEmpty(this.props.auth) && isLoaded(this.props.auth) && [
                    <ListItem button key="0" onClick={() => this.moveTo(LOGIN_ROUTE)}>
                        <ListItemText inset primary="Login" style={{paddingLeft: 5}}/>
                    </ListItem>,
                    <ListItem button key="1" onClick={() => this.moveTo(REGISTER_ROUTE)}>
                        <ListItemText inset primary="Registrieren" style={{paddingLeft: 5}}/>
                    </ListItem>
                ]
            }
            <ListItem button onClick={this.handlePlayerMenuClick}>
                <ListItemText inset primary="Spieler" style={{paddingLeft: 5}}/>
                {this.state.playersMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.playersMenuOpen} transitionDuration="auto" unmountOnExit>
                <ListItem button onClick={() => this.moveTo(PLAYERS_ROUTE)}>
                    <ListItemText inset primary="Liste" style={{paddingLeft: 15}}/>
                </ListItem>
                <ListItem button onClick={() => this.moveTo(ADD_PLAYER_ROUTE)}>
                    <ListItemText inset primary="Hinzufügen" style={{paddingLeft: 15}}/>
                </ListItem>
            </Collapse>
            <ListItem button onClick={this.handleTrainingMenuClick}>
                <ListItemText inset primary="Training" style={{paddingLeft: 5}}/>
                {this.state.trainingMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.trainingMenuOpen} transitionDuration="auto" unmountOnExit>
                <ListItem button onClick={() => this.moveTo(ADD_TRAINING_ROUTE)}>
                    <ListItemText inset primary="Hinzufügen" style={{paddingLeft: 15}}/>
                </ListItem>
            </Collapse>
            <ListItem button onClick={this.handleSeasonMenuClick}>
                <ListItemText inset primary="Saison" style={{paddingLeft: 5}}/>
                {this.state.trainingMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.seasonMenuOpen} transitionDuration="auto" unmountOnExit>
                <ListItem button onClick={() => this.moveTo(ADD_SEASONS_ROUTE)}>
                    <ListItemText inset primary="Hinzufügen" style={{paddingLeft: 15}}/>
                </ListItem>
            </Collapse>
            {
                !isEmpty(this.props.auth) && isLoaded(this.props.auth) &&
                    <ListItem button onClick={this.handleLogout}>
                        <ListItemText inset primary="Logout" style={{paddingLeft: 5}}/>
                    </ListItem>
            }
        </div>

    }
}

let DrawerMenuItems = firebaseConnect()(DrawerMenuItemPresentation);
DrawerMenuItems = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withRouter(DrawerMenuItems));

export default DrawerMenuItems
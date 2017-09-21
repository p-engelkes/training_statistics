import React from 'react';
import {AppBar, Button, IconButton, Menu, Toolbar, Typography, withStyles} from "material-ui";
import MenuIcon from 'material-ui-icons/Menu';
import {Link} from "react-router-dom";
import {firebaseConnect, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import {MenuItem} from "../../../node_modules/material-ui/Menu/index";

const styles = {
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    }
};

class TopNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        }
    }

    handleClick = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleLogout() {
        this.props.firebase.logout();
    }

    render() {
        const {classes} = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        Trainings Statistiken
                    </Typography>
                    {
                        isEmpty(this.props.auth) ?
                            <div>
                                <Button color="contrast" to={"register"} component={Link}>
                                    Registrieren
                                </Button>
                                <Button color="contrast" to={"/login"} component={Link}>
                                    Login
                                </Button>
                            </div> :
                            <div>
                                <Button
                                    color="contrast"
                                    aria-owns={this.state.open ? 'simple-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                >
                                    Spieler
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={this.state.open}
                                    onRequestClose={this.handleRequestClose}
                                >
                                    <MenuItem onClick={this.handleRequestClose} to={"/players"} component={Link}>
                                        Liste
                                    </MenuItem>
                                    <MenuItem onClick={this.handleRequestClose} to="/players/add" component={Link}>
                                        Hinzufügen
                                    </MenuItem>
                                </Menu>
                                <Button color="contrast" onClick={this.handleLogout}>
                                    Logout
                                </Button>
                            </div>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

TopNavigation = firebaseConnect()(TopNavigation);
TopNavigation = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withStyles(styles)(TopNavigation));

export default TopNavigation;
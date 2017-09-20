import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography, withStyles} from "material-ui";
import MenuIcon from 'material-ui-icons/Menu';
import {Link} from "react-router-dom";
import {firebaseConnect, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";

const styles = {
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    }
};

let TopNavigation = props => {
    const {classes} = props;

    function handleLogout() {
        props.firebase.logout();
    }

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
                    isEmpty(props.auth) ?
                        <div>
                            <Button color="contrast" to={"register"} component={Link}>
                                Registrieren
                            </Button>
                            <Button color="contrast" to={"/login"} component={Link}>
                                Login
                            </Button>
                        </div> :
                        <div>
                            <Button color="contrast" to="/players" component={Link}>
                                Spieler
                            </Button>
                            <Button color="contrast" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                }
            </Toolbar>
        </AppBar>
    )
};

TopNavigation = firebaseConnect()(TopNavigation);
TopNavigation = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withStyles(styles)(TopNavigation));

export default TopNavigation;
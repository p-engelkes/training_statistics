import React from 'react';
import {AppBar, Hidden, IconButton, Menu, Toolbar, Typography, withStyles} from "material-ui";
import MenuIcon from 'material-ui-icons/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {AppBarMenuItemsExport} from "./app.drawer.elements";
import AppDrawer from './app.drawer';

const styles = theme => ({
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    typography: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: 200
        },
        [theme.breakpoints.down('lg')]: {
            marginLeft: 0
        }
    }
});

class TopNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileDrawerOpen: false,
            anchorEl: null,
            dropDownMenuOpen: false
        }
    }

    handleDrawerClose = () => {
        this.setState({mobileDrawerOpen: false})
    };

    handleDrawerToggle = () => {
        this.setState({mobileDrawerOpen: !this.state.mobileDrawerOpen})
    };

    handleMenuOpen = event => {
        this.setState({dropDownMenuOpen: true, anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({dropDownMenuOpen: false});
    };

    handleLogout = () => {
        this.props.firebase.logout();
    };

    render() {
        const {classes} = this.props;

        return <div>
            <AppBar>
                <Toolbar>
                    <Hidden lgUp implementation="css">
                        <IconButton
                            color="contrast"
                            aria-label="Open Drawer"
                            onClick={this.handleDrawerToggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                    <Typography type="title" color="inherit" noWrap className={classes.typography}>
                        Trainings Statistiken
                    </Typography>
                    <IconButton
                        aria-label="More"
                        aria-owns="Open right Menu"
                        aria-haspopup="true"
                        onClick={this.handleMenuOpen}
                    >
                        <MoreVertIcon/>
                    </IconButton>

                    <Menu
                        id="menuRight"
                        anchorEl={this.state.anchorEl}
                        open={this.state.dropDownMenuOpen}
                        onRequestClose={this.handleMenuClose}
                    >
                        <AppBarMenuItemsExport onClick={this.handleMenuClose}/>
                    </Menu>
                </Toolbar>
            </AppBar>
            <AppDrawer
                onRequestClose={this.handleDrawerClose}
                mobileDrawerOpen={this.state.mobileDrawerOpen}
            />
        </div>
    }
}

TopNavigation = firebaseConnect()(TopNavigation);
TopNavigation = connect(
    ({firebase: {auth}}) => ({
        auth
    })
)(withStyles(styles)(TopNavigation));

export default TopNavigation;
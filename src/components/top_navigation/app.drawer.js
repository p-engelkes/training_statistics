import React from 'react'
import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'

import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import DrawerMenuItems from "./app.drawer.elements";

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: 200,
        left: 0
    },
    anchor: {
        color: theme.palette.text.secondary,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});


function AppDrawer(props, context) {
    const {classes, className, mobileDrawerOpen, closeDrawer} = props;

    const drawerHeader = (
        <div className={classes.drawerHeader}>
            <Hidden mdDown>
                <h3>Trainings Statistiken</h3>
            </Hidden>
            <Hidden lgUp>
                <h5>Trainings Statistiken</h5>
            </Hidden>
            <Hidden lgUp implementation="css">
                <IconButton onClick={closeDrawer} style={{justifyContent: 'flex-end'}}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Hidden>
        </div>
    );

    const drawer = (
        <div id="first drawer div">
            {drawerHeader}
            <DrawerMenuItems closeDrawer={closeDrawer}/>
        </div>
    );

    return (
        <div className={className}>
            <Hidden lgUp>
                <Drawer
                    classes={{
                        paper: classes.paper,
                    }}
                    type="temporary"
                    open={mobileDrawerOpen}
                    onRequestClose={closeDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>

            <Hidden lgDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.paper,
                    }}
                    type="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    mobileDrawerOpen: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppDrawer);

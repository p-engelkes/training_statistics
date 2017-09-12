import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography, withStyles} from "material-ui";
import MenuIcon from 'material-ui-icons/Menu';
import {Link} from "react-router-dom";
const styles = {
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    }
};

function TopNavigation(props) {
    const {classes} = props;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                    Trainings Statistiken
                </Typography>
                <Button color="contrast">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(TopNavigation)
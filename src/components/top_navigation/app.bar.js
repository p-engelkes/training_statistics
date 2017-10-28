import React from 'react';
import MenuIcon from 'material-ui-icons/Menu'
import {AppBar, Hidden, IconButton, Toolbar, Typography, withStyles} from "material-ui";
import AppDrawer from './app.drawer';
import {withRouter} from "react-router-dom";
import {INDEX_ROUTE} from "../../router";
import {compose} from "redux";
import {connect} from "react-redux";

const styles = theme => ({
    flex: {
        flex: 1
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

    handleBrandClick = () => {
        this.props.history.push(INDEX_ROUTE)
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
                    <Typography type="title" color="inherit" noWrap className={classes.typography}
                                onClick={this.handleBrandClick}>
                        {this.props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppDrawer
                closeDrawer={this.handleDrawerClose}
                mobileDrawerOpen={this.state.mobileDrawerOpen}
            />
        </div>
    }
}

TopNavigation = compose(
    withRouter,
    withStyles(styles),
    connect(
        (state) => ({
            title: state.title
        })
    )
)(TopNavigation);

export default TopNavigation;
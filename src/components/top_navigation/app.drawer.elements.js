import React from 'react'
import Divider from 'material-ui/Divider'
import {MenuItem} from 'material-ui/Menu'
import Collapse from 'material-ui/transitions/Collapse'
import {ListItem, ListItemText} from "../../../node_modules/material-ui/List/index";
import {ExpandLess, ExpandMore} from "material-ui-icons";


export class DrawerMenuItems extends React.Component {
    state = {
        playersMenuOpen: false
    };

    handlePlayerMenuClick = () => {
        this.setState({playersMenuOpen: !this.state.playersMenuOpen});
    };

    render() {
        return <div>
            <Divider />
            <ListItem button onClick={this.handlePlayerMenuClick}>
                <ListItemText inset primary="Spieler" style={{paddingLeft: 5}}/>
                {this.state.playersMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.playersMenuOpen} transitionDuration="auto" unmountOnExit>
                <ListItem button>
                    <ListItemText inset primary="Liste"/>
                </ListItem>
                <ListItem button>
                    <ListItemText inset primary="Hinzufügen"/>
                </ListItem>
            </Collapse>
        </div>
    }
}


function btn_logout() {
    console.log("CLICK!")
}

const AppBarMenuItems = ({onClick, logout}) => (
    <div>
        <MenuItem onClick={() => {
            onClick();
            btn_logout();
        }}>My account</MenuItem>
        <MenuItem onClick={() => {
            onClick();
            btn_logout();
        }}>Logout</MenuItem>
    </div>
)


export const AppBarMenuItemsExport = AppBarMenuItems;

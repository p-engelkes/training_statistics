import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';

export default class PlayerGrid extends Component {
   render() {
       const {players} = this.props;

       return (
           <Grid item xs={12} lg={6}>
               <List>
                   {
                       Object.keys(this.props.players).map((key) => (
                           <ListItem key={key} dense button
                                     onClick={() => this.props.handleItemClick({
                                         player: players[key],
                                         key
                                     })}
                                     className={this.props.getSelectedClass(key)}
                           >
                               <ListItemText primary={`${players[key].firstName} ${players[key].lastName}`}/>
                               <ListItemSecondaryAction>
                                   <IconButton aria-label="Delete" onClick={() => this.props.handleDelete(key)}>
                                       <DeleteIcon/>
                                   </IconButton>
                               </ListItemSecondaryAction>
                           </ListItem>
                       ))
                   }
               </List>
           </Grid>
       )
   }
}

PlayerGrid.propTypes = {
    players: PropTypes.object.isRequired,
    handleItemClick: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    getSelectedClass: PropTypes.func.isRequired
};
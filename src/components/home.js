import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    firebaseConnect,
    // orderedToJS, // needed for ordered list
    // populatedDataToJS // needed for populated list
} from 'react-redux-firebase'
import {Button, Grid} from "material-ui";

class HomePresentation extends Component {
    render() {
        return <Grid container spacing={0}>
            <Grid container justify="center">
                <Grid item xs={12} lg={8}>
                    <div style={{background: 'red'}}>Test</div>
                </Grid>
            </Grid>
            <Grid container justify="flex-end" style={{paddingTop: 8}}>
                <Grid item>
                    <Button
                        type="submit"
                        raised={true}
                        color="primary"
                        key="button"
                    >
                        hinzufügen
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    }
}

const wrappedHome = firebaseConnect(['/todos'])(HomePresentation);
export const Home = connect(
    ({firebase: {data: {todos}}}) => ({
        todos // Connect props.todos to state.firebase.data.todos
    })
)(wrappedHome);
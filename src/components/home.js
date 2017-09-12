import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    firebaseConnect,
    // orderedToJS, // needed for ordered list
    // populatedDataToJS // needed for populated list
} from 'react-redux-firebase'

class HomePresentation extends Component {
    render() {
        return (
            <div>Home Component</div>
        )
    }
}

const wrappedHome = firebaseConnect(['/todos'])(HomePresentation);
export const Home = connect(
    ({firebase: {data: {todos}}}) => ({
        todos // Connect props.todos to state.firebase.data.todos
    })
)(wrappedHome);
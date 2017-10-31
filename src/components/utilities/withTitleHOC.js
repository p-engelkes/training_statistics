import React from 'react';
import {connect} from "react-redux";
import {setTitle} from "../../store/title/title.actions";

export const withTitle = (title) => (WrappedComponent) => {
    class WithTitleComponent extends React.Component {
        componentDidMount() {
            this.props.setTitle(title)
        }

        render() {
            return <WrappedComponent {...this.props}/>
        }
    }

    const mapStateToProps = state => ({
        title: state.title
    });

    const mapDispatchToProps = dispatch => ({
        setTitle(title) {
            dispatch(setTitle(title))
        }
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithTitleComponent)
};
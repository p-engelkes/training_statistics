import {combineReducers} from 'redux';
import {firebaseStateReducer as firebase} from 'react-redux-firebase';
import {reducer as formReducer} from 'redux-form';

export const makeRootReducer = () => {
    return combineReducers({
        firebase,
        form: formReducer
    })
};
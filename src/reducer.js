import {combineReducers} from 'redux';
import {firebaseStateReducer as firebase} from 'react-redux-firebase';
import {reducer as formReducer} from 'redux-form';
import {titleReducer as title} from "./store/title/title.reducer";

export const makeRootReducer = () => {
    return combineReducers({
        title,
        firebase,
        form: formReducer
    })
};
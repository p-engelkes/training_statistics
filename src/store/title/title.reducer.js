import {SET_TITLE} from "./title.constants";

export const titleReducer = (state = "", action) => {
    switch (action.type) {
        case SET_TITLE:
            return action.title;
        default:
            return state;
    }
};
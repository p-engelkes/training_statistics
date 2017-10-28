import {SET_TITLE} from "./title.constants";

export function setTitle(title) {
    return {
        type: SET_TITLE,
        title
    }
}
import {DATE} from "../../constants/forms/training.form.constants";
import {SEASON} from "../../constants/forms/season.form.constants";

export const validateTraining = values => {
    const errors = {};

    if (!values[DATE]) {
        errors[DATE] = "Ein Datum muss ausgewählt werden"
    }

    if (!values[SEASON]) {
        errors[SEASON] = "Eine Saison muss ausgewählt werden"
    }

    return errors;
};
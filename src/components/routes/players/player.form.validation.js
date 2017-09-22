export const validatePlayerForm = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "Ein Vorname muss eingegeben werden"
    }

    if (!values.lastName) {
        errors.lastName = "Ein Nachname muss eingegeben werden"
    }

    return errors;
};
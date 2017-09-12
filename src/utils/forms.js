export const required = value => (value ? undefined : 'Required');

export const validateEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const matchesValue = otherValue => value => {
    console.log(`otherValue: ${otherValue} value: ${value}`);
    if (value === otherValue) {
        console.log('passwords match');
        return undefined
    } else {
        console.log('passwords do not match');
        return 'Passwörter stimmen nicht überein'
    }
};
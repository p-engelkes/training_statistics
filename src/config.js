export const firebaseConfig = {
    apiKey: "AIzaSyDpOcurnGnwV9FNIU1jxffWPNk-lFfPFSw",
    authDomain: "trainings-statistics.firebaseapp.com",
    databaseURL: "https://trainings-statistics.firebaseio.com",
    projectId: "trainings-statistics",
    storageBucket: "",
    messagingSenderId: "507891488091"
};

export const reduxFirebase = {
    userProfile: 'users', // root that user profiles are written to
    enableLogging: false, // enable/disable Firebase Database Logging
    updateProfileOnLogin: false // enable/disable updating of profile on login
    // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
};
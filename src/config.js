export const firebaseConfig = {
    apiKey: 'AIzaSyB38_qiDQnzpY5LtUicSz--t-P4gJyYMM4',
    authDomain: 'my-auth-test-7c837.firebaseapp.com',
    databaseURL: 'https://my-auth-test-7c837.firebaseio.com',
    projectId: 'my-auth-test-7c837',
    storageBucket: 'my-auth-test-7c837.appspot.com',
    messagingSenderId: '740038655892'
};

export const reduxFirebase = {
    userProfile: 'users', // root that user profiles are written to
    enableLogging: false, // enable/disable Firebase Database Logging
    updateProfileOnLogin: false // enable/disable updating of profile on login
    // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
};
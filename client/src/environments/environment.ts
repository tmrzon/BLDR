// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCznY66GuoxjVLKMveNJ7C8WwRuB9C7L-Y",
    authDomain: "tammarproject.firebaseapp.com",
    databaseURL: "https://tammarproject.firebaseio.com",
    projectId: "tammarproject",
    storageBucket: "tammarproject.appspot.com",
    messagingSenderId: "255374237533",
    appId: "1:255374237533:web:a31e9ee46bedf3ec44d2b4",
    measurementId: "G-C2ZZ1DEV44"
  },
  BASE_URL: "http://localhost:3000/",
  FILES_URL:"https://files.bldr.codes/api/",
  ACCOUNTS_URL:"https://dev.accounts.codes/api/",
  LEADER_URL:"https://api.dev.leader.codes/",
  LOGIN_URL:"https://dev.accounts.codes/bldr/login",
  JWT:"devJwt"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

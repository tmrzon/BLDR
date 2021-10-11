let isDev = window.location.hostname == 'bldr.codes' ? false : true;

export const environment = {
  production: true,
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
  BASE_URL: "https://bldr.codes/",
  FILES_URL: "https://files.bldr.codes/api/",
  ACCOUNTS_URL: "https://dev.accounts.codes/api/",
  LEADER_URL: "https://api.leader.codes/",
  LOGIN_URL: "https://dev.accounts.codes/bldr/login",
  JWT: isDev ? "devJwt" : "jwt"
};

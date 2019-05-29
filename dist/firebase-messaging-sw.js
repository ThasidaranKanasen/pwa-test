importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyDrZZ3G5DTmlFVT8i5FJwbJm7YOWz70YYA",
    authDomain: "pegasus-1b9eb.firebaseapp.com",
    databaseURL: "https://pegasus-1b9eb.firebaseio.com",
    projectId: "pegasus-1b9eb",
    storageBucket: "pegasus-1b9eb.appspot.com",
    messagingSenderId: "339448737385",
    appId: "1:339448737385:web:5f17859770f08726"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
